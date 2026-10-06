// Three.js 3D Renderer for iPhone mockups

let threeRenderer = null;
let threeScene = null;
let threeCamera = null;
let phoneModel = null;
let phonePivot = null;  // Pivot group for rotation around screen center
let screenMesh = null;
let customScreenPlane = null;
let orbitControls = null;
let isThreeJSInitialized = false;
let phoneModelLoaded = false;
let phoneModelLoading = false;

// Screen texture for the screenshot
let screenTexture = null;

// Store original model scale
let baseModelScale = 1;

// Store base position offset to keep model centered after screen alignment
let basePositionOffset = { x: 0, y: 0, z: 0 };

// Current device model type
let currentDeviceModel = 'iphone';

// Cache for loaded phone models (for rendering different devices in side previews)
let phoneModelCache = {};  // { deviceType: { model, pivot, screenPlane, baseScale, loaded } }

// Device-specific configurations
const deviceConfigs = {
    iphone: {
        modelPath: 'models/iphone-15-pro-max.glb',
        aspectRatio: 1290 / 2796,
        screenHeightFactor: 0.826,
        screenOffset: { x: 0.027, y: 0.745, z: 0.098 },
        positionOffsetFactor: 0.81,
        cornerRadiusFactor: 0.16,
        modelRotation: { x: 0, y: 0, z: 0 }  // No correction needed
    },
    'iphone-duo': {
        modelPath: 'models/iphone-duo.glb',
        // Hinge rig: Bone_01 articulates one half. 0° lays the device flat
        // (inner display showing), 180° closes it (outer/cover display showing).
        // Each pose has its own canvas orientation, so each is scaled to fill
        // its own viewport (see the per-pose sizeFactor values below).
        sizeFactor: 1.26,
        cornerRadiusFactor: 0.06,
        modelRotation: { x: 0, y: 0, z: 0 },
        defaultPose: 'unfolded',
        poses: {
            unfolded: {
                bones: { Bone_Hinge: 0, Bone_01: 0 },
                // Partial unfold: the hinge angle is 180° * (1 - unfoldPercent/100),
                // where 100% is flat open and 0% is fully closed. `foldHingeZ` is the
                // depth of the inner display surface, i.e. the real hinge axis.
                foldBone: 'Bone_01',
                foldHingeZ: 0.0024,
                aspectRatio: 0.1586 / 0.1109,
                screenHeightFactor: 0.1109 / 4.3,
                screenOffset: { x: 0.000, y: 0.0589, z: 0.0055 },
                fitScreen: true,
                // Landscape canvas: the wide, open device is height-constrained.
                sizeFactor: 1.26
            },
            folded: {
                bones: { Bone_Hinge: 0, Bone_01: 180 },
                aspectRatio: 0.0779 / 0.1104,
                screenHeightFactor: 0.1104 / 4.3,
                screenOffset: { x: 0.0409, y: 0.0591, z: 0.0105 },
                fitScreen: true,
                // Portrait canvas (1398x2034): the folded device is the width
                // constraint, so it is scaled to fill that viewport.
                sizeFactor: 1.24
            }
        }
    },
    samsung: {
        modelPath: 'models/samsung-galaxy-s25-ultra.glb',
        aspectRatio: 1440 / 3120,
        screenHeightFactor: 0.66,
        screenOffset: { x: 0, y: 0.0, z: 0.08},  // Will need adjustment
        positionOffsetFactor: 0.5,
        cornerRadiusFactor: 0.04,
        modelRotation: { x: 0, y: 0, z: 0 }  // Adjust to correct model tilt (in degrees)
    },
    ipad: {
        modelPath: 'models/apple_ipad_pro.glb',
        aspectRatio: 3 / 4,
        screenHeightFactor: 17.2,
        screenOffset: { x: 0.0, y: 38.54, z: 0.05 },
        positionOffsetFactor: 0.75,
        cornerRadiusFactor: 0.06,
        modelRotation: { x: 0, y: 0, z: 0 }
    }
};

// Models are normalised so their largest dimension spans 3.75 units, which
// assumes a portrait device. Models that are wider than they are tall (e.g. the
// unfolded foldable) would then overflow the viewport, so a config may shrink
// them further via `sizeFactor` — optionally per pose, since a foldable's two
// poses are framed in viewports of different orientations.
function getPoseSizeFactor(deviceType, settings) {
    const config = deviceConfigs[deviceType];
    if (!config) return 1;
    const poseName = getActivePoseName(deviceType, settings);
    const pose = poseName ? config.poses[poseName] : null;
    return (pose && pose.sizeFactor) || config.sizeFactor || 1;
}

function getModelBaseScale(size, deviceType, settings) {
    const maxDim = Math.max(size?.x || 1, size?.y || 1, size?.z || 1);
    return (3.75 / maxDim) * getPoseSizeFactor(deviceType, settings);
}

// Devices with a `poses` map (the foldable) can be articulated. The pose is
// chosen per screenshot via its `duoState`; every other device just uses the
// flat top-level screen values.
function getActivePoseName(deviceType, settings) {
    const config = deviceConfigs[deviceType];
    if (!config || !config.poses) return null;
    const ss = settings || (typeof getScreenshotSettings === 'function' ? getScreenshotSettings() : null);
    const wanted = ss?.duoState || config.defaultPose;
    return config.poses[wanted] ? wanted : config.defaultPose;
}

// Screen plane geometry for the given device and pose.
function getScreenSpec(deviceType, settings) {
    const config = deviceConfigs[deviceType] || deviceConfigs.iphone;
    const poseName = getActivePoseName(deviceType, settings);
    const pose = poseName ? config.poses[poseName] : null;
    return {
        aspectRatio: pose ? pose.aspectRatio : config.aspectRatio,
        screenHeightFactor: pose ? pose.screenHeightFactor : config.screenHeightFactor,
        screenOffset: pose ? pose.screenOffset : config.screenOffset,
        fitScreen: pose ? !!pose.fitScreen : !!config.fitScreen,
        cornerRadiusFactor: config.cornerRadiusFactor || 0.06,
        // Poses that hinge open (the foldable's inner display) bend the overlay
        // at the crease so the screenshot follows the display. `foldHingeZ` is
        // the display's surface depth, i.e. where the hinge axis really sits.
        foldRadians: pose && pose.foldBone
            ? THREE.MathUtils.degToRad(180 * (1 - getUnfoldPercent(settings) / 100))
            : 0,
        hingeZ: pose && pose.foldBone ? (pose.foldHingeZ || 0) - pose.screenOffset.z : 0
    };
}

// Below this the foldable's own body starts to cover the tilted half of the
// display, so the screenshot would be clipped.
const MIN_UNFOLD_PERCENT = 70;

function getUnfoldPercent(settings) {
    const ss = settings || (typeof getScreenshotSettings === 'function' ? getScreenshotSettings() : null);
    const value = Number(ss?.unfoldPercent);
    if (!Number.isFinite(value)) return 100;
    return Math.min(100, Math.max(MIN_UNFOLD_PERCENT, value));
}

// Articulate the hinge rig for the pose the screenshot is using.
function applyDevicePose(model, deviceType, settings) {
    const config = deviceConfigs[deviceType];
    const poseName = getActivePoseName(deviceType, settings);
    if (!config || !poseName || !config.poses[poseName].bones) return;
    const bones = Object.assign({}, config.poses[poseName].bones);
    const foldBone = config.poses[poseName].foldBone;
    if (foldBone) {
        // 100% unfolded is flat (0°); fully closed is 180°.
        bones[foldBone] = 180 * (1 - getUnfoldPercent(settings) / 100);
    }
    model.traverse((o) => {
        if (!o.isBone) return;
        Object.keys(bones).forEach((bone) => {
            if (o.name === bone || o.name.startsWith(bone + '_')) {
                o.rotation.x = THREE.MathUtils.degToRad(bones[bone]);
            }
        });
    });
    model.updateMatrixWorld(true);
}

// Builds the screen quad. A device whose pose hinges (the foldable) gets its two
// halves as separate quads so the left one can pivot at the hinge and the
// screenshot bends exactly like the display underneath. `hingeZ` is how far the
// real hinge axis sits behind the overlay plane.
function createScreenGeometry(width, height, foldRadians, hingeZ) {
    if (!foldRadians) return new THREE.PlaneGeometry(width, height);

    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const cos = Math.cos(foldRadians);
    const sin = Math.sin(foldRadians);
    const positions = [];
    const uvs = [];
    const addQuad = (fromX, toX, hinged) => {
        [[fromX, -halfHeight], [toX, -halfHeight], [toX, halfHeight], [fromX, halfHeight]]
            .forEach(([x, y]) => {
                let px = x;
                let pz = 0;
                if (hinged) {
                    px = x * cos + hingeZ * sin;
                    pz = -x * sin + hingeZ * cos - hingeZ;
                }
                positions.push(px, y, pz);
                uvs.push((x + halfWidth) / width, (y + halfHeight) / height);
            });
    };
    addQuad(-halfWidth, 0, true);
    addQuad(0, halfWidth, false);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex([0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]);
    return geometry;
}

// Resize and reposition an existing screen plane to match a screen spec.
function applyScreenSpec(plane, spec) {
    const planeHeight = 4.3 * spec.screenHeightFactor;
    const planeWidth = planeHeight * spec.aspectRatio;
    const foldRadians = spec.foldRadians || 0;
    const hingeZ = spec.hingeZ || 0;
    const applied = plane.userData.appliedScreenSpec;

    if (!applied
        || Math.abs(applied.width - planeWidth) > 1e-6
        || Math.abs(applied.height - planeHeight) > 1e-6
        || Math.abs(applied.foldRadians - foldRadians) > 1e-6
        || Math.abs(applied.hingeZ - hingeZ) > 1e-6) {
        plane.geometry.dispose();
        plane.geometry = createScreenGeometry(planeWidth, planeHeight, foldRadians, hingeZ);
        plane.userData.appliedScreenSpec = { width: planeWidth, height: planeHeight, foldRadians, hingeZ };
    }
    plane.position.set(spec.screenOffset.x, spec.screenOffset.y, spec.screenOffset.z);
}

// Snapshot the articulation of a model plus its screen plane size/position, so a
// temporary pose used while rendering a side preview can be reverted afterwards.
function capturePoseState(model, plane) {
    const bones = [];
    if (model) {
        model.traverse((o) => {
            if (o.isBone) bones.push([o, o.rotation.x]);
        });
    }
    return {
        bones,
        modelPosition: model ? model.position.clone() : null,
        modelScale: model ? model.scale.x : null,
        planeState: plane
            ? { spec: plane.userData.appliedScreenSpec, position: plane.position.clone() }
            : null
    };
}

// Pose a model, scale it for that pose's viewport, centre it on that pose's
// screen, and size its screen plane. `modelSize` is only needed when the model
// has not been through a config-driven load (it is cached on the model itself).
function applyPoseState(model, plane, deviceType, settings, modelSize) {
    if (model) {
        const scale = getModelBaseScale(modelSize || model.userData.modelSize, deviceType, settings);
        model.scale.setScalar(scale);
        model.userData.appliedSizeFactor = getPoseSizeFactor(deviceType, settings);
        applyDevicePose(model, deviceType, settings);
        const off = getScreenSpec(deviceType, settings).screenOffset;
        model.position.set(-off.x * scale, -off.y * scale, -off.z * scale);
    }
    if (plane) applyScreenSpec(plane, getScreenSpec(deviceType, settings));
}

function restorePoseState(model, plane, snapshot) {
    if (!snapshot) return;
    snapshot.bones.forEach(([bone, x]) => {
        bone.rotation.x = x;
    });
    if (model && snapshot.modelPosition) model.position.copy(snapshot.modelPosition);
    if (model && snapshot.modelScale) model.scale.setScalar(snapshot.modelScale);
    if (snapshot.planeState && plane) {
        const { spec } = snapshot.planeState;
        if (spec) {
            applyScreenSpec(plane, {
                screenHeightFactor: spec.height / 4.3,
                aspectRatio: spec.width / spec.height,
                screenOffset: snapshot.planeState.position,
                foldRadians: spec.foldRadians,
                hingeZ: spec.hingeZ
            });
        }
    }
    if (model) model.updateMatrixWorld(true);
}

// Frame color presets per device (real device colors)
// Using var so it's accessible from app.js
var frameColorPresets = {
    iphone: [
        { id: 'natural', label: 'Natural Titanium', swatch: '#9d927f',
          materials: { backpanel: '#9d927f', metalframe: '#5f5950', gray: '#221f1b' } },
        { id: 'blue', label: 'Blue Titanium', swatch: '#3d4d5c',
          materials: { backpanel: '#394d5f', metalframe: '#3a4553', gray: '#1a1f24' } },
        { id: 'white', label: 'White Titanium', swatch: '#e3ddd4',
          materials: { backpanel: '#e3ddd4', metalframe: '#c4bdb4', gray: '#2a2825' } },
        { id: 'black', label: 'Black Titanium', swatch: '#3a3632',
          materials: { backpanel: '#3a3632', metalframe: '#2a2725', gray: '#1a1918' } },
        { id: 'desert', label: 'Desert Titanium', swatch: '#c4a882',
          materials: { backpanel: '#c4a882', metalframe: '#8a7560', gray: '#2a2218' } },
        { id: 'deep-purple', label: 'Deep Purple', swatch: '#5b4a6e',
          materials: { backpanel: '#5b4a6e', metalframe: '#3d3348', gray: '#1e1825' } },
        { id: 'gold', label: 'Gold', swatch: '#e3c8a0',
          materials: { backpanel: '#e3c8a0', metalframe: '#c9a96e', gray: '#2a2418' } },
        { id: 'red', label: 'Product Red', swatch: '#c1272d',
          materials: { backpanel: '#c1272d', metalframe: '#8a1c20', gray: '#1a0a0a' } },
    ],
    samsung: [
        { id: 'gray', label: 'Titanium Gray', swatch: '#8a8a8a',
          materials: { back_glass: '#4c4c4c', frame: '#cdcdcd', antenna: '#707070' } },
        { id: 'black', label: 'Titanium Black', swatch: '#2a2a2a',
          materials: { back_glass: '#1a1a1a', frame: '#3a3a3a', antenna: '#2a2a2a' } },
        { id: 'silverblue', label: 'Titanium Silverblue', swatch: '#a8b8c8',
          materials: { back_glass: '#8a9eb0', frame: '#b8c8d4', antenna: '#7a8ea0' } },
        { id: 'whitesilver', label: 'Titanium Whitesilver', swatch: '#e8e4df',
          materials: { back_glass: '#d8d4cf', frame: '#e8e4df', antenna: '#c0bcb7' } },
        { id: 'pinkgold', label: 'Titanium Pinkgold', swatch: '#d4a89a',
          materials: { back_glass: '#c89888', frame: '#d4b0a0', antenna: '#b08878' } },
        { id: 'jadegreen', label: 'Titanium Jadegreen', swatch: '#9aaa9c',
          materials: { back_glass: '#7a9a7c', frame: '#a8b8aa', antenna: '#6a8a6c' } },
        { id: 'jetblack', label: 'Titanium Jetblack', swatch: '#404040',
          materials: { back_glass: '#2a2a2a', frame: '#484848', antenna: '#353535' } },
    ],
    ipad: [
        { id: 'silver', label: 'Silver', swatch: '#e3e0da',
          materials: { backpanel: '#e3e0da', metalframe: '#c4bfb8', gray: '#221f1b' } },
        { id: 'spacegray', label: 'Space Gray', swatch: '#3d3b39',
          materials: { backpanel: '#3d3b39', metalframe: '#2a2826', gray: '#1a1918' } },
        { id: 'starlight', label: 'Starlight', swatch: '#f0ede6',
          materials: { backpanel: '#f0ede6', metalframe: '#d8d2c8', gray: '#2a261e' } },
        { id: 'spaceblack', label: 'Space Black', swatch: '#2a2826',
          materials: { backpanel: '#2a2826', metalframe: '#1c1a18', gray: '#121110' } },
        { id: 'purple', label: 'Purple', swatch: '#7d6da0',
          materials: { backpanel: '#7d6da0', metalframe: '#5c4d78', gray: '#1e1825' } },
        { id: 'blue', label: 'Blue', swatch: '#6b859c',
          materials: { backpanel: '#6b859c', metalframe: '#4b6378', gray: '#1a1f24' } },
    ],
    // The foldable is authored with named colourway materials, so presets target
    // those material names directly instead of the generic iphone ones.
    'iphone-duo': [
        { id: 'starwhite', label: 'Star White', swatch: '#e8e5df',
          materials: { c_starwhite_side: '#e8e5df', c_starwhite_backpanel: '#efede8', c_sw_side_matte: '#d5d2cc', c_sw_backpanel_inner: '#dcd9d3' } },
        { id: 'black', label: 'Space Black', swatch: '#3a3632',
          materials: { c_starwhite_side: '#3a3632', c_starwhite_backpanel: '#2b2825', c_sw_side_matte: '#262320', c_sw_backpanel_inner: '#201e1b' } },
        { id: 'blue', label: 'Deep Blue', swatch: '#5b7fa6',
          materials: { c_starwhite_side: '#5b7fa6', c_starwhite_backpanel: '#4a6a8c', c_sw_side_matte: '#3f5b78', c_sw_backpanel_inner: '#3a5470' } },
        { id: 'silver', label: 'Silver', swatch: '#c9cbcd',
          materials: { c_starwhite_side: '#c9cbcd', c_starwhite_backpanel: '#d8dadd', c_sw_side_matte: '#b4b7ba', c_sw_backpanel_inner: '#bcc0c3' } },
    ]
};

// Store original material colors for the current model
let originalMaterialColors = {};

// Apply a frame color preset to the phone model
function setPhoneFrameColor(presetId, deviceType) {
    if (!phoneModel) return;

    deviceType = deviceType || currentDeviceModel;
    const presets = frameColorPresets[deviceType];
    if (!presets) return;

    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;

    phoneModel.traverse((child) => {
        if (child.isMesh && child.material) {
            const matName = (child.material.name || '').toLowerCase();
            if (preset.materials[matName]) {
                child.material.color.set(preset.materials[matName]);
            }
        }
    });

    requestThreeJSRender();
}

// Apply frame color to a cached model (for side previews)
function setCachedModelFrameColor(presetId, deviceType) {
    const cached = phoneModelCache[deviceType];
    if (!cached?.loaded) return;

    const presets = frameColorPresets[deviceType];
    if (!presets) return;

    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;

    cached.model.traverse((child) => {
        if (child.isMesh && child.material) {
            const matName = (child.material.name || '').toLowerCase();
            if (preset.materials[matName]) {
                child.material.color.set(preset.materials[matName]);
            }
        }
    });
}

// Initialize Three.js scene
function initThreeJS() {
    if (isThreeJSInitialized) return;

    const container = document.getElementById('threejs-container');
    if (!container) return;

    // Create scene with a gradient background color (we'll update this dynamically)
    threeScene = new THREE.Scene();
    threeScene.background = new THREE.Color(0x667eea); // Default gradient start color

    // Create camera
    const aspect = 400 / 700;
    threeCamera = new THREE.PerspectiveCamera(35, aspect, 0.1, 1000);
    threeCamera.position.set(0, 0, 6);

    // Create renderer - disable antialiasing for faster interactive performance
    // Quality rendering is done at export time with higher resolution
    threeRenderer = new THREE.WebGLRenderer({
        antialias: false,  // Disable for better performance
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: 'high-performance'
    });
    threeRenderer.setSize(400, 700);
    // Use device pixel ratio of 1 for fastest interactive rendering
    threeRenderer.setPixelRatio(1);
    threeRenderer.outputEncoding = THREE.sRGBEncoding;
    threeRenderer.toneMapping = THREE.NoToneMapping;
    // Disable automatic clearing - we control this manually
    threeRenderer.autoClear = false;

    container.appendChild(threeRenderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    threeScene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(2, 3, 4);
    threeScene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-2, 1, 2);
    threeScene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
    rimLight.position.set(0, -2, -3);
    threeScene.add(rimLight);

    // Add orbit controls (disabled - we use custom drag handling for better performance)
    // orbitControls = new THREE.OrbitControls(threeCamera, threeRenderer.domElement);
    // orbitControls.enableDamping = true;
    // orbitControls.dampingFactor = 0.05;
    // orbitControls.enableZoom = false;
    // orbitControls.enablePan = false;
    // orbitControls.rotateSpeed = 0.5;
    // orbitControls.minPolarAngle = Math.PI / 4;
    // orbitControls.maxPolarAngle = Math.PI * 3 / 4;
    // orbitControls.minAzimuthAngle = -Math.PI / 3;
    // orbitControls.maxAzimuthAngle = Math.PI / 3;

    isThreeJSInitialized = true;

    // Load the phone model - check state for which device to use
    let deviceToLoad = 'iphone';
    if (typeof state !== 'undefined' && typeof getScreenshotSettings === 'function') {
        const ss = getScreenshotSettings();
        if (ss?.device3D) {
            deviceToLoad = ss.device3D;
        }
    }
    currentDeviceModel = deviceToLoad;
    loadPhoneModel();

    // Start animation loop
    animateThreeJS();
}

// Load the phone 3D model based on currentDeviceModel
// Frees a detached model's GPU resources.
function disposeObjectTree(root) {
    root.traverse((child) => {
        if (!child.isMesh) return;
        child.geometry?.dispose();
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => material?.dispose());
    });
}

function loadPhoneModel() {
    if (phoneModelLoading) return; // Prevent double loading
    phoneModelLoading = true;

    const requestedDevice = currentDeviceModel;
    const config = deviceConfigs[requestedDevice] || deviceConfigs.iphone;
    const loader = new THREE.GLTFLoader();

    loader.load(
        config.modelPath,
        (gltf) => {
            phoneModelLoading = false;
            // Another model was requested while this one was still downloading;
            // adding it now would leave a ghost device in the scene.
            if (currentDeviceModel !== requestedDevice) {
                disposeObjectTree(gltf.scene);
                return;
            }
            phoneModel = gltf.scene;
            applyDevicePose(phoneModel, currentDeviceModel);
            // Center and scale the model
            const box = new THREE.Box3().setFromObject(phoneModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            // Center the model
            phoneModel.position.sub(center);

            // Scale to fit view (3.75 = 2.5 * 1.5 to match 2D scale at 100%)
            phoneModel.userData.modelSize = size.clone();
            baseModelScale = getModelBaseScale(size, currentDeviceModel);
            phoneModel.scale.setScalar(baseModelScale);

            // Log all meshes to help identify the screen
            console.log('Phone model meshes:');
            let blackMeshes = [];
            phoneModel.traverse((child) => {
                if (child.isMesh) {
                    console.log('  Mesh:', child.name, '| Material:', child.material?.name);

                    // Look for screen mesh - in this model it's likely "black" material
                    const name = (child.name || '').toLowerCase();
                    const matName = (child.material?.name || '').toLowerCase();

                    if (matName === 'black') {
                        blackMeshes.push(child);
                    }

                    if (name.includes('screen') || name.includes('display') ||
                        matName.includes('screen') || matName.includes('display') ||
                        matName.includes('emission') || matName.includes('emissive')) {
                        screenMesh = child;
                        console.log('  -> Identified as screen mesh');
                    }
                }
            });

            // Find the front glass - that's where the screen actually is
            // Don't use black meshes, those are small elements like notch/dynamic island
            let glassMeshes = [];
            phoneModel.traverse((child) => {
                if (child.isMesh) {
                    const matName = (child.material?.name || '').toLowerCase();
                    if (matName === 'glass') {
                        child.geometry.computeBoundingBox();
                        const box = child.geometry.boundingBox;
                        const size = new THREE.Vector3();
                        box.getSize(size);
                        const area = size.x * size.y;
                        glassMeshes.push({ mesh: child, area, size });
                        console.log('  Glass mesh:', child.name, 'size:', size.x.toFixed(3), 'x', size.y.toFixed(3), 'area:', area.toFixed(3));
                    }
                }
            });

            // Use the largest glass mesh (front screen glass)
            if (glassMeshes.length > 0) {
                glassMeshes.sort((a, b) => b.area - a.area);
                screenMesh = glassMeshes[0].mesh;
                console.log('  -> Using largest glass mesh as screen:', screenMesh.name);
            }

            // Create a pivot group for rotation around screen center
            const screenOffset = getScreenSpec(currentDeviceModel).screenOffset;

            phonePivot = new THREE.Group();

            // Offset the phone model so the screen center is at the pivot's origin
            phoneModel.position.set(
                -screenOffset.x * baseModelScale,
                -screenOffset.y * baseModelScale,
                -screenOffset.z * baseModelScale
            );

            phonePivot.add(phoneModel);
            threeScene.add(phonePivot);

            // Create a custom screen plane overlay since the model's UV mapping may be incorrect
            createScreenOverlay();

            phoneModelLoaded = true;

            // Apply initial settings from state
            if (typeof state !== 'undefined') {
                updateThreeJSBackground();
                const ss = typeof getScreenshotSettings === 'function' ? getScreenshotSettings() : state.defaults?.screenshot;
                const rotation3D = ss?.rotation3D || { x: 0, y: 0, z: 0 };
                setThreeJSRotation(rotation3D.x, rotation3D.y, rotation3D.z);

                // Apply frame color
                if (ss?.frameColor) {
                    setPhoneFrameColor(ss.frameColor, currentDeviceModel);
                }

                // Apply screenshot texture
                if (state.screenshots.length > 0) {
                    updateScreenTexture();
                }

                // Refresh canvas now that model is loaded (needed for side previews too)
                if (typeof updateCanvas === 'function') {
                    updateCanvas();
                }
            }

            console.log('Phone model loaded successfully');
        },
        (progress) => {
            const percent = Math.round(progress.loaded / progress.total * 100);
            console.log('Loading phone model... ' + percent + '%');
        },
        (error) => {
            console.error('Error loading phone model:', error);
            phoneModelLoading = false;
            // Fallback: create a procedural device for iPad (no GLB file needed)
            if (currentDeviceModel === 'ipad') {
                createProceduralIpad();
            }
        }
    );
}

// Procedural iPad model — a rounded-rect body with screen cutout.
// Used when no iPad .glb file is available.
function createProceduralIpad() {
    const w = 2.2;  // width
    const h = 3.0;  // height
    const d = 0.08; // depth
    const r = 0.18; // corner radius
    const screenInset = 0.12;

    // Body: a box with beveled edges simulated via RoundedBox (Box + edge bevels look OK)
    const bodyGeo = new THREE.BoxGeometry(w, h, d);
    const bodyMat = new THREE.MeshStandardMaterial({ color: '#3d3b39', roughness: 0.4, metalness: 0.3 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.name = 'ipad-body';

    // Screen: slightly inset dark rect on the front face
    const screenGeo = new THREE.PlaneGeometry(w - screenInset * 2, h - screenInset * 2);
    const screenMat = new THREE.MeshStandardMaterial({ color: '#000000', roughness: 0.1, metalness: 0.0 });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.z = d / 2 + 0.001;
    screen.name = 'ipad-screen';

    // Group everything
    phoneModel = new THREE.Group();
    phoneModel.add(body);
    phoneModel.add(screen);

    // Scale
    baseModelScale = 3.75 / Math.max(w, h);
    phoneModel.scale.setScalar(baseModelScale);

    // Pivot
    phonePivot = new THREE.Group();
    const screenOffset = getScreenSpec('ipad').screenOffset;
    phoneModel.position.set(
        -screenOffset.x * baseModelScale,
        -screenOffset.y * baseModelScale,
        -screenOffset.z * baseModelScale
    );
    phonePivot.add(phoneModel);
    threeScene.add(phonePivot);

    // Screen overlay for screenshot texture
    screenMesh = screen;
    createScreenOverlay();

    phoneModelLoaded = true;

    if (typeof state !== 'undefined') {
        updateThreeJSBackground();
        const ss = typeof getScreenshotSettings === 'function' ? getScreenshotSettings() : state.defaults?.screenshot;
        const rotation3D = ss?.rotation3D || { x: 0, y: 0, z: 0 };
        setThreeJSRotation(rotation3D.x, rotation3D.y, rotation3D.z);
        if (ss?.frameColor) {
            setPhoneFrameColor(ss.frameColor, 'ipad');
        }
        if (state.screenshots.length > 0) {
            updateScreenTexture();
        }
        if (typeof updateCanvas === 'function') {
            updateCanvas();
        }
    }

    console.log('Procedural iPad created successfully');
}

// Switch to a different phone model
function switchPhoneModel(deviceType) {
    if (!deviceConfigs[deviceType]) {
        console.error('Unknown device type:', deviceType);
        return;
    }

    // Skip if same device and already loaded or loading
    if (currentDeviceModel === deviceType && (phoneModelLoaded || phoneModelLoading)) {
        return;
    }

    // Update current device type
    currentDeviceModel = deviceType;
    phoneModelLoading = false; // Reset so we can load the new one

    // Remove current pivot (which contains the model) from scene
    if (phonePivot && threeScene) {
        threeScene.remove(phonePivot);
        phonePivot.traverse((child) => {
            if (child.isMesh) {
                child.geometry?.dispose();
                child.material?.dispose();
            }
        });
        phonePivot = null;
        phoneModel = null;
    }

    // Clean up screen plane
    if (customScreenPlane) {
        if (customScreenPlane.parent) {
            customScreenPlane.parent.remove(customScreenPlane);
        }
        customScreenPlane.geometry?.dispose();
        customScreenPlane.material?.dispose();
        customScreenPlane = null;
    }

    screenMesh = null;
    phoneModelLoaded = false;

    // Load new model using the config
    const config = deviceConfigs[currentDeviceModel];
    const loader = new THREE.GLTFLoader();

    loader.load(
        config.modelPath,
        (gltf) => {
            // A newer model was requested while this one was downloading.
            if (currentDeviceModel !== deviceType) {
                disposeObjectTree(gltf.scene);
                return;
            }
            phoneModel = gltf.scene;
            applyDevicePose(phoneModel, currentDeviceModel);

            // Center and scale the model
            const box = new THREE.Box3().setFromObject(phoneModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            phoneModel.position.sub(center);

            phoneModel.userData.modelSize = size.clone();
            baseModelScale = getModelBaseScale(size, currentDeviceModel);
            phoneModel.scale.setScalar(baseModelScale);

            // Create a pivot group for rotation around screen center
            const screenOffset = getScreenSpec(currentDeviceModel).screenOffset;
            phonePivot = new THREE.Group();

            // Offset the phone model so the screen center is at the pivot's origin
            phoneModel.position.set(
                -screenOffset.x * baseModelScale,
                -screenOffset.y * baseModelScale,
                -screenOffset.z * baseModelScale
            );

            phonePivot.add(phoneModel);
            threeScene.add(phonePivot);

            // Create screen overlay for this device
            createScreenOverlay();

            phoneModelLoaded = true;

            // Apply settings
            if (typeof state !== 'undefined') {
                updateThreeJSBackground();
                const ss = typeof getScreenshotSettings === 'function' ? getScreenshotSettings() : state.defaults?.screenshot;
                const rotation3D = ss?.rotation3D || { x: 0, y: 0, z: 0 };
                setThreeJSRotation(rotation3D.x, rotation3D.y, rotation3D.z);

                // Apply frame color
                if (ss?.frameColor) {
                    setPhoneFrameColor(ss.frameColor, currentDeviceModel);
                }

                if (state.screenshots.length > 0) {
                    updateScreenTexture();
                }

                // Only call updateCanvas if not suppressed (e.g., during slide transitions)
                if (typeof updateCanvas === 'function' && !window.suppressSwitchModelUpdate) {
                    updateCanvas();
                }
            }

            console.log(deviceType + ' model loaded successfully');
        },
        (progress) => {
            const percent = Math.round(progress.loaded / progress.total * 100);
            console.log('Loading ' + deviceType + ' model... ' + percent + '%');
        },
        (error) => {
            console.error('Error loading ' + deviceType + ' model:', error);
        }
    );
}

// Load a phone model into the cache (for side preview rendering with different devices)
function loadCachedPhoneModel(deviceType) {
    if (!deviceConfigs[deviceType]) return Promise.reject('Unknown device type');

    // Already loaded or loading
    if (phoneModelCache[deviceType]?.loaded) {
        return Promise.resolve(phoneModelCache[deviceType]);
    }
    if (phoneModelCache[deviceType]?.loading) {
        return phoneModelCache[deviceType].loadingPromise;
    }

    const config = deviceConfigs[deviceType];
    const loader = new THREE.GLTFLoader();

    phoneModelCache[deviceType] = { loading: true, loaded: false };

    phoneModelCache[deviceType].loadingPromise = new Promise((resolve, reject) => {
        loader.load(
            config.modelPath,
            (gltf) => {
                const model = gltf.scene;
                // Cached models are shared between previews, so they start in the
                // default pose and get re-posed per render by renderThreeJSForScreenshot.
                const defaultSettings = { duoState: config.defaultPose };
                applyDevicePose(model, deviceType, defaultSettings);

                // Center and scale the model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                model.position.sub(center);

                const modelBaseScale = getModelBaseScale(size, deviceType, defaultSettings);
                model.scale.setScalar(modelBaseScale);
                model.userData.modelSize = size.clone();
                model.userData.appliedSizeFactor = getPoseSizeFactor(deviceType, defaultSettings);

                // Create pivot for this model
                const spec = getScreenSpec(deviceType, defaultSettings);
                const screenOffset = spec.screenOffset;
                const pivot = new THREE.Group();

                model.position.set(
                    -screenOffset.x * modelBaseScale,
                    -screenOffset.y * modelBaseScale,
                    -screenOffset.z * modelBaseScale
                );

                pivot.add(model);

                // Create screen plane for this model
                const aspectRatio = spec.aspectRatio;
                const planeHeight = 4.3 * spec.screenHeightFactor;
                const planeWidth = planeHeight * aspectRatio;

                const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
                const material = new THREE.MeshBasicMaterial({
                    color: 0x111111,
                    side: THREE.DoubleSide
                });

                const screenPlane = new THREE.Mesh(geometry, material);
                screenPlane.position.set(screenOffset.x, screenOffset.y, screenOffset.z);

                const modelRot = config.modelRotation || { x: 0, y: 0, z: 0 };
                screenPlane.rotation.set(
                    -modelRot.x * Math.PI / 180,
                    -modelRot.y * Math.PI / 180,
                    -modelRot.z * Math.PI / 180
                );

                model.add(screenPlane);

                phoneModelCache[deviceType] = {
                    model: model,
                    pivot: pivot,
                    screenPlane: screenPlane,
                    baseScale: modelBaseScale,
                    loaded: true,
                    loading: false
                };

                console.log('Cached ' + deviceType + ' model for side previews');
                resolve(phoneModelCache[deviceType]);
            },
            undefined,
            (error) => {
                console.error('Error loading cached ' + deviceType + ' model:', error);
                phoneModelCache[deviceType] = { loading: false, loaded: false };
                reject(error);
            }
        );
    });

    return phoneModelCache[deviceType].loadingPromise;
}

// Preload all device models for side previews
function preloadAllPhoneModels() {
    const deviceTypes = Object.keys(deviceConfigs);
    return Promise.all(deviceTypes.map(type => loadCachedPhoneModel(type).catch(() => null)));
}

// Create a custom screen plane overlay with correct UV mapping
function createScreenOverlay() {
    if (customScreenPlane) {
        if (customScreenPlane.parent) {
            customScreenPlane.parent.remove(customScreenPlane);
        }
        customScreenPlane.geometry.dispose();
        customScreenPlane.material.dispose();
    }

    const config = deviceConfigs[currentDeviceModel] || deviceConfigs.iphone;
    const spec = getScreenSpec(currentDeviceModel);

    // Use device/pose-specific aspect ratio and screen size
    const aspectRatio = spec.aspectRatio;
    const planeHeight = 4.3 * spec.screenHeightFactor;
    const planeWidth = planeHeight * aspectRatio;

    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    const material = new THREE.MeshBasicMaterial({
        color: 0x111111,
        side: THREE.DoubleSide
    });

    customScreenPlane = new THREE.Mesh(geometry, material);

    // Position at center of phone, slightly in front of glass
    const screenOffset = spec.screenOffset;
    customScreenPlane.position.set(screenOffset.x, screenOffset.y, screenOffset.z);

    // Counter-rotate the screen to cancel out the model's base rotation
    // This keeps the screen facing forward when the pivot applies the base rotation
    const modelRot = config.modelRotation || { x: 0, y: 0, z: 0 };
    customScreenPlane.rotation.set(
        -modelRot.x * Math.PI / 180,
        -modelRot.y * Math.PI / 180,
        -modelRot.z * Math.PI / 180
    );

    // Add directly to phoneModel so it moves with it
    phoneModel.add(customScreenPlane);

    // basePositionOffset is no longer needed since we use pivot-based rotation
    basePositionOffset.y = 0;

    console.log('Created screen overlay for ' + currentDeviceModel + ' at:', customScreenPlane.position);
    console.log('Plane size:', planeWidth.toFixed(4), 'x', planeHeight.toFixed(4));
}

// Create a rounded corner version of the screenshot
function createRoundedScreenImage(image, cornerRadius) {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');

    // Draw rounded rectangle path
    const w = canvas.width;
    const h = canvas.height;
    const r = cornerRadius;

    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(w - r, 0);
    ctx.quadraticCurveTo(w, 0, w, r);
    ctx.lineTo(w, h - r);
    ctx.quadraticCurveTo(w, h, w - r, h);
    ctx.lineTo(r, h);
    ctx.quadraticCurveTo(0, h, 0, h - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();

    // Clip to rounded rectangle and draw image
    ctx.clip();
    ctx.drawImage(image, 0, 0);

    return canvas;
}

// Builds the screen image texture for a device. A screenshot whose aspect ratio
// differs from the display is stretched to fill it by default; devices that set
// `fitScreen` (e.g. the foldable, whose inner display is landscape) letterbox it
// instead so the screenshot keeps its proportions.
function createScreenImage(image, spec) {
    let source = image;
    if (spec.fitScreen) {
        const fitted = document.createElement('canvas');
        fitted.width = image.width;
        fitted.height = Math.round(image.width / spec.aspectRatio);
        const ctx = fitted.getContext('2d');
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, fitted.width, fitted.height);
        const scale = Math.min(fitted.width / image.width, fitted.height / image.height);
        const w = image.width * scale;
        const h = image.height * scale;
        ctx.drawImage(image, (fitted.width - w) / 2, (fitted.height - h) / 2, w, h);
        source = fitted;
    }
    return createRoundedScreenImage(source, Math.round(source.width * spec.cornerRadiusFactor));
}

// Keep the loaded model's pose and screen plane matched to the current screenshot.
function syncDeviceScreen() {
    if (!phoneModel) return;
    const poseName = getActivePoseName(currentDeviceModel);
    const sizeFactor = getPoseSizeFactor(currentDeviceModel);
    const unfoldPercent = getUnfoldPercent();
    const poseChanged = phoneModel.userData.appliedPose !== poseName
        || phoneModel.userData.appliedUnfold !== unfoldPercent;
    const scaleChanged = phoneModel.userData.appliedSizeFactor !== sizeFactor;

    if (poseChanged || scaleChanged) {
        baseModelScale = getModelBaseScale(phoneModel.userData.modelSize, currentDeviceModel);
        applyPoseState(phoneModel, customScreenPlane, currentDeviceModel, null);
        phoneModel.userData.appliedPose = poseName;
        phoneModel.userData.appliedUnfold = unfoldPercent;
    }
    if (customScreenPlane) {
        applyScreenSpec(customScreenPlane, getScreenSpec(currentDeviceModel));
    }
}

// Update the screen texture with current screenshot
function updateScreenTexture() {
    if (!phoneModel) return;
    syncDeviceScreen();
    if (typeof state === 'undefined' || !state.screenshots.length) return;

    const screenshot = state.screenshots[state.selectedIndex];
    // Use getScreenshotImage() for localized image support
    const screenshotImage = typeof getScreenshotImage === 'function'
        ? getScreenshotImage(screenshot)
        : screenshot?.image;
    if (!screenshot || !screenshotImage) return;

    // Create texture from screenshot
    if (screenTexture) {
        screenTexture.dispose();
    }

    // Create the screen texture image using device/pose-specific corner radius
    const roundedImage = createScreenImage(screenshotImage, getScreenSpec(currentDeviceModel));

    screenTexture = new THREE.Texture(roundedImage);
    screenTexture.needsUpdate = true;
    screenTexture.encoding = THREE.sRGBEncoding;
    screenTexture.flipY = true;

    // Create a material for the screen with transparency for rounded corners
    const screenMaterial = new THREE.MeshBasicMaterial({
        map: screenTexture,
        side: THREE.FrontSide,
        transparent: true
    });

    // Apply to custom screen plane (preferred)
    if (customScreenPlane) {
        customScreenPlane.material.dispose();
        customScreenPlane.material = screenMaterial;
    }

    // Trigger render update
    requestThreeJSRender();
}

// Set 3D rotation from sliders (in degrees)
function setThreeJSRotation(rotX, rotY, rotZ) {
    if (!phonePivot) return;

    // Add the device's base model rotation to the user's rotation
    const config = deviceConfigs[currentDeviceModel] || deviceConfigs.iphone;
    const modelRot = config.modelRotation || { x: 0, y: 0, z: 0 };

    console.log('setThreeJSRotation:', currentDeviceModel, 'modelRot:', modelRot, 'user:', rotX, rotY, rotZ);

    // Rotate the pivot (which rotates around the screen center)
    phonePivot.rotation.x = (rotX + modelRot.x) * Math.PI / 180;
    phonePivot.rotation.y = (rotY + modelRot.y) * Math.PI / 180;
    phonePivot.rotation.z = (rotZ + modelRot.z) * Math.PI / 180;

    // Trigger render update
    requestThreeJSRender();
}

// Set 3D scale
function setThreeJSScale(scale) {
    if (!phoneModel) return;

    phoneModel.scale.setScalar(baseModelScale * (scale / 100));

    // Trigger render update
    requestThreeJSRender();
}

// Render on demand instead of continuous animation loop
let renderRequested = false;

function requestThreeJSRender() {
    if (renderRequested) return;
    renderRequested = true;
    requestAnimationFrame(() => {
        renderRequested = false;
        if (threeRenderer && threeScene && threeCamera) {
            threeRenderer.clear();
            threeRenderer.render(threeScene, threeCamera);
        }
    });
}

// Legacy function name for compatibility - now triggers on-demand render
function animateThreeJS() {
    requestThreeJSRender();
}

// Render 3D phone only (with transparent background) to be composited
function renderThreeJSToCanvas(targetCanvas, width, height) {
    if (!threeRenderer || !threeScene || !threeCamera || !phonePivot) return;

    const dims = { width: width || 1290, height: height || 2796 };

    // Store original values
    const originalBackground = threeScene.background;
    const originalPosition = phonePivot.position.clone();
    const originalScale = phonePivot.scale.clone();
    const originalRotation = phonePivot.rotation.clone();

    // Apply position, scale, and rotation from screenshot settings
    if (typeof state !== 'undefined') {
        // Use getScreenshotSettings() helper if available, otherwise fall back to defaults
        const ss = typeof getScreenshotSettings === 'function' ? getScreenshotSettings() : state.defaults?.screenshot;
        if (ss) {
            // Scale: use screenshot.scale to adjust model size
            const screenshotScale = ss.scale / 100;
            phonePivot.scale.setScalar(screenshotScale);

            // Position: match 2D behavior where available space depends on (1 - scale)
            // This ensures same percentages look the same in 2D and 3D
            // X uses smaller factor (1.1) since canvas is taller than wide (400x700 aspect)
            const availableSpaceY = (1 - screenshotScale) * 2;
            const availableSpaceX = (1 - screenshotScale) * 0.9;
            const xOffset = ((ss.x - 50) / 50) * availableSpaceX;
            const yOffset = -((ss.y - 50) / 50) * availableSpaceY; // Inverted for 3D
            phonePivot.position.set(
                xOffset + basePositionOffset.x,
                yOffset + basePositionOffset.y,
                basePositionOffset.z
            );

            // Rotation: apply 3D rotation from current screenshot settings + model base rotation
            const rotation3D = ss.rotation3D || { x: 0, y: 0, z: 0 };
            const config = deviceConfigs[currentDeviceModel] || deviceConfigs.iphone;
            const modelRot = config.modelRotation || { x: 0, y: 0, z: 0 };
            phonePivot.rotation.set(
                (rotation3D.x + modelRot.x) * Math.PI / 180,
                (rotation3D.y + modelRot.y) * Math.PI / 180,
                (rotation3D.z + modelRot.z) * Math.PI / 180
            );
        }
    }

    // Set transparent background for compositing
    threeScene.background = null;
    threeRenderer.setClearColor(0x000000, 0); // Fully transparent clear color

    // Temporarily resize renderer
    const oldSize = { width: 400, height: 700 };
    threeRenderer.setSize(dims.width, dims.height);
    threeCamera.aspect = dims.width / dims.height;
    threeCamera.updateProjectionMatrix();

    // Clear the renderer before drawing (ensures clean transparency)
    threeRenderer.clear();

    // Render with transparency
    threeRenderer.render(threeScene, threeCamera);

    // Draw to target canvas (compositing the 3D phone onto existing content)
    const ctx = targetCanvas.getContext('2d');
    ctx.drawImage(threeRenderer.domElement, 0, 0, dims.width, dims.height);

    // Restore size, background, and model transforms
    threeRenderer.setSize(oldSize.width, oldSize.height);
    threeCamera.aspect = oldSize.width / oldSize.height;
    threeCamera.updateProjectionMatrix();
    threeScene.background = originalBackground;
    phonePivot.position.copy(originalPosition);
    phonePivot.scale.copy(originalScale);
    phonePivot.rotation.copy(originalRotation);
}

// Render 3D for a specific screenshot index (used for side previews)
function renderThreeJSForScreenshot(targetCanvas, width, height, screenshotIndex) {
    if (!threeRenderer || !threeScene || !threeCamera) return;
    if (typeof state === 'undefined' || !state.screenshots[screenshotIndex]) return;

    const screenshot = state.screenshots[screenshotIndex];
    const ss = screenshot.screenshot;
    const dims = { width: width || 1290, height: height || 2796 };

    // Determine which device model this screenshot uses
    const screenshotDeviceType = ss.device3D || 'iphone';
    const config = deviceConfigs[screenshotDeviceType] || deviceConfigs.iphone;

    // Check if this screenshot uses the same device as currently active
    const useCurrentModel = screenshotDeviceType === currentDeviceModel && phonePivot;

    // Get the model to use (either current or from cache)
    let pivotToUse, screenPlaneToUse;

    if (useCurrentModel) {
        // Use the currently loaded model
        pivotToUse = phonePivot;
        screenPlaneToUse = customScreenPlane;
    } else {
        // Use cached model for different device
        const cached = phoneModelCache[screenshotDeviceType];
        if (!cached?.loaded) {
            // Model not cached yet - trigger loading and skip this render
            loadCachedPhoneModel(screenshotDeviceType).then(() => {
                // Trigger a re-render once model is loaded
                if (typeof updateCanvas === 'function') {
                    updateCanvas();
                }
            });
            return;
        }
        pivotToUse = cached.pivot;
        screenPlaneToUse = cached.screenPlane;

        // Add cached pivot to scene temporarily
        threeScene.add(pivotToUse);
    }

    // This screenshot may use a different pose (folded/unfolded) than the model
    // is currently in, so pose it for this render and revert afterwards.
    const cachedEntry = useCurrentModel ? null : phoneModelCache[screenshotDeviceType];
    const modelToPose = useCurrentModel ? phoneModel : cachedEntry?.model;
    const poseSnapshot = capturePoseState(modelToPose, screenPlaneToUse);
    applyPoseState(modelToPose, screenPlaneToUse, screenshotDeviceType, ss);

    // Store original values
    const originalBackground = threeScene.background;
    const originalPosition = pivotToUse.position.clone();
    const originalScale = pivotToUse.scale.clone();
    const originalRotation = pivotToUse.rotation.clone();

    // Hide the current model if we're using a different one
    if (!useCurrentModel && phonePivot) {
        phonePivot.visible = false;
    }

    // Temporarily update screen texture for this screenshot
    // Use getScreenshotImage() for localized image support
    const screenshotImage = typeof getScreenshotImage === 'function'
        ? getScreenshotImage(screenshot)
        : screenshot?.image;
    const oldMaterial = screenPlaneToUse ? screenPlaneToUse.material : null;
    if (screenshotImage && screenPlaneToUse) {
        const roundedImage = createScreenImage(screenshotImage, getScreenSpec(screenshotDeviceType, ss));
        const newTexture = new THREE.Texture(roundedImage);
        newTexture.needsUpdate = true;
        newTexture.encoding = THREE.sRGBEncoding;
        newTexture.flipY = true;

        const newMaterial = new THREE.MeshBasicMaterial({
            map: newTexture,
            side: THREE.FrontSide,
            transparent: true
        });
        screenPlaneToUse.material = newMaterial;
    }

    // Apply frame color for this screenshot
    if (ss.frameColor) {
        if (useCurrentModel) {
            setPhoneFrameColor(ss.frameColor, screenshotDeviceType);
        } else {
            setCachedModelFrameColor(ss.frameColor, screenshotDeviceType);
        }
    }

    // Apply rotation for this screenshot + model base rotation
    const rotation3D = ss.rotation3D || { x: 0, y: 0, z: 0 };
    const modelRot = config.modelRotation || { x: 0, y: 0, z: 0 };
    pivotToUse.rotation.set(
        (rotation3D.x + modelRot.x) * Math.PI / 180,
        (rotation3D.y + modelRot.y) * Math.PI / 180,
        (rotation3D.z + modelRot.z) * Math.PI / 180
    );

    // Apply scale and position (matching 2D behavior)
    const screenshotScale = ss.scale / 100;
    pivotToUse.scale.setScalar(screenshotScale);
    const availableSpaceY = (1 - screenshotScale) * 2;
    const availableSpaceX = (1 - screenshotScale) * 0.9;
    const xOffset = ((ss.x - 50) / 50) * availableSpaceX;
    const yOffset = -((ss.y - 50) / 50) * availableSpaceY;
    pivotToUse.position.set(
        xOffset + basePositionOffset.x,
        yOffset + basePositionOffset.y,
        basePositionOffset.z
    );

    // Set transparent background for compositing
    threeScene.background = null;
    threeRenderer.setClearColor(0x000000, 0); // Fully transparent clear color

    // Temporarily resize renderer
    const oldSize = { width: 400, height: 700 };
    threeRenderer.setSize(dims.width, dims.height);
    threeCamera.aspect = dims.width / dims.height;
    threeCamera.updateProjectionMatrix();

    // Clear the renderer before drawing (ensures clean transparency)
    threeRenderer.clear();

    // Render with transparency
    threeRenderer.render(threeScene, threeCamera);

    // Draw to target canvas (composite 3D phone onto existing background)
    const ctx = targetCanvas.getContext('2d');
    ctx.drawImage(threeRenderer.domElement, 0, 0, dims.width, dims.height);

    // Restore everything
    threeRenderer.setSize(oldSize.width, oldSize.height);
    threeCamera.aspect = oldSize.width / oldSize.height;
    threeCamera.updateProjectionMatrix();
    threeScene.background = originalBackground;
    pivotToUse.position.copy(originalPosition);
    pivotToUse.scale.copy(originalScale);
    pivotToUse.rotation.copy(originalRotation);

    // Put the model back in the pose the editor is showing
    restorePoseState(modelToPose, screenPlaneToUse, poseSnapshot);

    // Restore original material
    if (oldMaterial && screenPlaneToUse) {
        // Dispose the temporary material
        if (screenPlaneToUse.material !== oldMaterial) {
            screenPlaneToUse.material.map?.dispose();
            screenPlaneToUse.material.dispose();
        }
        screenPlaneToUse.material = oldMaterial;
    }

    // Restore frame color on current model if we changed it
    if (useCurrentModel && ss.frameColor && typeof state !== 'undefined') {
        const currentSS = typeof getScreenshotSettings === 'function' ? getScreenshotSettings() : null;
        if (currentSS?.frameColor) {
            setPhoneFrameColor(currentSS.frameColor, currentDeviceModel);
        }
    }

    // Clean up: remove cached model from scene and restore current model visibility
    if (!useCurrentModel) {
        threeScene.remove(pivotToUse);
        if (phonePivot) {
            phonePivot.visible = true;
        }
    }
}

// Show/hide Three.js container
function showThreeJS(show) {
    const container = document.getElementById('threejs-container');
    const canvas = document.getElementById('preview-canvas');

    // In 3D mode, we show the 2D canvas (which composites everything)
    // The Three.js container is hidden but used for rendering
    if (container) {
        container.style.display = 'none'; // Always hidden - we render to 2D canvas
    }
    if (canvas) {
        canvas.style.display = 'block'; // Always visible
    }

    if (show && !isThreeJSInitialized) {
        initThreeJS();
    }

    // Apply current rotation and background
    if (show && typeof state !== 'undefined') {
        updateThreeJSBackground();
        if (phoneModel) {
            const ss = typeof getScreenshotSettings === 'function' ? getScreenshotSettings() : state.defaults?.screenshot;
            const rotation3D = ss?.rotation3D || { x: 0, y: 0, z: 0 };
            setThreeJSRotation(rotation3D.x, rotation3D.y, rotation3D.z);
            updateScreenTexture();
        }
    }
}

// Get Three.js canvas for export
function getThreeJSCanvas() {
    return threeRenderer ? threeRenderer.domElement : null;
}

// Update Three.js scene background from state
function updateThreeJSBackground() {
    if (!threeScene || typeof state === 'undefined') return;

    // Use getBackground() helper if available, otherwise fall back to defaults
    const bg = typeof getBackground === 'function' ? getBackground() : state.defaults?.background;
    if (!bg) return;

    if (bg.type === 'solid') {
        threeScene.background = new THREE.Color(bg.solid);
    } else if (bg.type === 'gradient') {
        // Use the first gradient color as background (Three.js doesn't support gradients natively)
        const firstStop = bg.gradient.stops[0];
        if (firstStop) {
            threeScene.background = new THREE.Color(firstStop.color);
        }
    } else {
        // For image backgrounds, use a neutral color
        threeScene.background = new THREE.Color(0x1a1a2e);
    }

    // Trigger render update
    requestThreeJSRender();
}

// Cleanup
function disposeThreeJS() {
    if (screenTexture) {
        screenTexture.dispose();
    }
    if (threeRenderer) {
        threeRenderer.dispose();
    }
    isThreeJSInitialized = false;
    phoneModelLoaded = false;
}

// Interactive rotation/movement for 2D canvas in 3D mode
let isDragging3D = false;
let isAltDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;
let dragUpdatePending = false;

function getUse3D() {
    if (typeof getScreenshotSettings === 'function') {
        const ss = getScreenshotSettings();
        return ss?.use3D || false;
    }
    return state.defaults?.screenshot?.use3D || false;
}

function setup3DCanvasInteraction() {
    const canvas = document.getElementById('preview-canvas');
    if (!canvas) return;

    canvas.addEventListener('mousedown', (e) => {
        if (typeof state !== 'undefined' && getUse3D()) {
            isDragging3D = true;
            isAltDragging = e.altKey;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            canvas.style.cursor = isAltDragging ? 'move' : 'grabbing';
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging3D || typeof state === 'undefined' || !getUse3D()) return;
        // Don't rotate 3D device while dragging an element
        const wrapper = document.getElementById('canvas-wrapper');
        if (wrapper && wrapper.classList.contains('element-dragging')) {
            isDragging3D = false;
            isAltDragging = false;
            canvas.style.cursor = '';
            return;
        }

        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        // Get current screenshot settings
        const ss = typeof getScreenshotSettings === 'function' ? getScreenshotSettings() : state.defaults?.screenshot;
        if (!ss) return;

        if (isAltDragging) {
            // Alt+drag: move position (x, y)
            ss.x = Math.max(0, Math.min(100, ss.x + deltaX * 0.2));
            ss.y = Math.max(0, Math.min(100, ss.y + deltaY * 0.2));

            // Update sliders
            document.getElementById('screenshot-x').value = ss.x;
            document.getElementById('screenshot-x-value').textContent = Math.round(ss.x) + '%';
            document.getElementById('screenshot-y').value = ss.y;
            document.getElementById('screenshot-y-value').textContent = Math.round(ss.y) + '%';
        } else {
            // Regular drag: rotate
            if (!ss.rotation3D) ss.rotation3D = { x: 0, y: 0, z: 0 };

            ss.rotation3D.y = Math.max(-45, Math.min(45, ss.rotation3D.y + deltaX * 0.5));
            ss.rotation3D.x = Math.max(-45, Math.min(45, ss.rotation3D.x + deltaY * 0.5));

            // Update sliders
            document.getElementById('rotation-3d-y').value = ss.rotation3D.y;
            document.getElementById('rotation-3d-y-value').textContent = Math.round(ss.rotation3D.y) + '°';
            document.getElementById('rotation-3d-x').value = ss.rotation3D.x;
            document.getElementById('rotation-3d-x-value').textContent = Math.round(ss.rotation3D.x) + '°';

            // Apply rotation directly to model (fast path - skip full updateCanvas)
            setThreeJSRotation(ss.rotation3D.x, ss.rotation3D.y, ss.rotation3D.z);
        }

        // Throttle updateCanvas calls using requestAnimationFrame
        if (!dragUpdatePending) {
            dragUpdatePending = true;
            requestAnimationFrame(() => {
                dragUpdatePending = false;
                if (typeof updateCanvas === 'function') {
                    updateCanvas();
                }
            });
        }
    });

    canvas.addEventListener('mouseup', () => {
        if (isDragging3D) {
            isDragging3D = false;
            isAltDragging = false;
            canvas.style.cursor = getUse3D() ? 'grab' : '';
        }
    });

    canvas.addEventListener('mouseleave', () => {
        if (isDragging3D) {
            isDragging3D = false;
            isAltDragging = false;
            canvas.style.cursor = '';
        }
    });

    // Change cursor when hovering in 3D mode
    canvas.addEventListener('mouseenter', () => {
        if (typeof state !== 'undefined' && getUse3D()) {
            canvas.style.cursor = 'grab';
        }
    });
}

// Initialize interaction when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup3DCanvasInteraction);
} else {
    setup3DCanvasInteraction();
}
