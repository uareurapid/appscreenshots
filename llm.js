// LLM Provider Configuration
// Centralized configuration for all AI translation providers and models

const llmProviders = {
    anthropic: {
        name: 'Anthropic (Claude)',
        keyPrefix: 'sk-ant-',
        storageKey: 'claudeApiKey',
        modelStorageKey: 'anthropicModel',
        models: [
            { id: 'claude-haiku-4-5-20251001', name: 'Claude Haiku 4.5 ($)' },
            { id: 'claude-sonnet-5', name: 'Claude Sonnet 5 ($$)' },
            { id: 'claude-opus-5', name: 'Claude Opus 5 ($$$)' },
            { id: 'claude-fable-5', name: 'Claude Fable 5 ($$$$)' }
        ],
        defaultModel: 'claude-sonnet-5'
    },
    openai: {
        name: 'OpenAI (GPT)',
        keyPrefix: 'sk-',
        storageKey: 'openaiApiKey',
        modelStorageKey: 'openaiModel',
        models: [
            { id: 'gpt-5.6-luna', name: 'GPT-5.6 Luna ($)' },
            { id: 'gpt-5.6-terra', name: 'GPT-5.6 Terra ($$)' },
            { id: 'gpt-5.6-sol', name: 'GPT-5.6 Sol ($$$)' }
        ],
        defaultModel: 'gpt-5.6-terra'
    },
    google: {
        name: 'Google (Gemini)',
        keyPrefix: 'AIza',
        storageKey: 'googleApiKey',
        modelStorageKey: 'googleModel',
        models: [
            { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash-Lite ($)' },
            { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash-Lite ($)' },
            { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash ($$)' },
            { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash ($$)' },
            { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro (Preview) ($$$)' }
        ],
        defaultModel: 'gemini-3.5-flash'
    },
    deepseek: {
        name: 'DeepSeek (V4)',
        keyPrefix: 'sk-',
        storageKey: 'deepseekApiKey',
        modelStorageKey: 'deepseekModel',
        models: [
            { id: 'deepseek-v4-flash', name: 'DeepSeek V4 Flash ($)' },
            { id: 'deepseek-v4-pro', name: 'DeepSeek V4 Pro ($$)' }
        ],
        defaultModel: 'deepseek-v4-flash'
    },
    glm: {
        name: 'GLM (Z.AI / Zhipu)',
        keyPrefix: '',
        storageKey: 'glmApiKey',
        modelStorageKey: 'glmModel',
        models: [
            { id: 'glm-4.7-flash', name: 'GLM-4.7 Flash ($)' },
            { id: 'glm-5-turbo', name: 'GLM-5 Turbo ($$)' },
            { id: 'glm-5v-turbo', name: 'GLM-5V Turbo - Vision ($$)' },
            { id: 'glm-5.2', name: 'GLM-5.2 ($$$)' }
        ],
        defaultModel: 'glm-5.2'
    }
};

/**
 * Get the selected model for a provider
 * @param {string} provider - Provider key (anthropic, openai, google, deepseek, glm)
 * @returns {string} - Model ID
 */
function getSelectedModel(provider) {
    const config = llmProviders[provider];
    if (!config) return null;
    return localStorage.getItem(config.modelStorageKey) || config.defaultModel;
}

/**
 * Get the selected provider
 * @returns {string} - Provider key
 */
function getSelectedProvider() {
    return localStorage.getItem('aiProvider') || 'anthropic';
}

/**
 * Get API key for a provider
 * @param {string} provider - Provider key
 * @returns {string|null} - API key or null
 */
function getApiKey(provider) {
    const config = llmProviders[provider];
    if (!config) return null;
    return localStorage.getItem(config.storageKey);
}

/**
 * Validate API key format for a provider
 * @param {string} provider - Provider key
 * @param {string} key - API key to validate
 * @returns {boolean} - Whether key format is valid
 */
function validateApiKeyFormat(provider, key) {
    const config = llmProviders[provider];
    if (!config) return false;
    return key.startsWith(config.keyPrefix);
}

/**
 * Generate HTML options for model select dropdown
 * @param {string} provider - Provider key
 * @param {string} selectedModel - Currently selected model ID (optional)
 * @returns {string} - HTML string of option elements
 */
function generateModelOptions(provider, selectedModel = null) {
    const config = llmProviders[provider];
    if (!config) return '';

    const selected = selectedModel || getSelectedModel(provider);
    return config.models.map(model =>
        `<option value="${model.id}"${model.id === selected ? ' selected' : ''}>${model.name}</option>`
    ).join('\n');
}
