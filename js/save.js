// 存档系统

// 保存游戏
function saveGame() {
    try {
        gameState.timestamp = Date.now();
        const saveData = deepClone(gameState);
        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        console.log('游戏已保存');
    } catch (e) {
        console.error('保存失败:', e);
    }
}

// 加载游戏
function loadGame() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) {
            return false;
        }

        const saveData = JSON.parse(raw);

        // 版本检查
        if (saveData.version < SAVE_VERSION) {
            migrateSave(saveData);
        }

        // 计算离线进度
        const offlineSeconds = (Date.now() - saveData.timestamp) / 1000;
        
        // 合并存档数据
        const defaultState = getDefaultState();
        deepMerge(defaultState, saveData);
        gameState = defaultState;

        // 应用离线进度
        if (offlineSeconds > 10) {
            applyOfflineProgress(offlineSeconds);
        }

        console.log('游戏已加载');
        return true;
    } catch (e) {
        console.error('加载失败:', e);
        return false;
    }
}

// 离线进度计算
function applyOfflineProgress(seconds) {
    const maxOffline = 3600 * 8; // 最多8小时
    const effectiveSeconds = Math.min(seconds, maxOffline);
    const production = getProductionPerSecond();
    
    // 离线效率50%
    const efficiency = 0.5;
    
    addResource('grain', production.grain * effectiveSeconds * efficiency);
    addResource('soldiers', production.soldiers * effectiveSeconds * efficiency);
    addResource('gold', production.gold * effectiveSeconds * efficiency);
    addResource('prestige', production.prestige * effectiveSeconds * efficiency);
    
    console.log(`离线进度: ${formatTime(effectiveSeconds)} (效率${efficiency * 100}%)`);
}

// 存档迁移（处理版本升级）
function migrateSave(saveData) {
    console.log(`存档迁移: v${saveData.version} -> v${SAVE_VERSION}`);
    
    if (saveData.version < 2) {
        saveData.conqueredCities = saveData.conqueredCities || {};
        saveData.unificationAchieved = saveData.unificationAchieved || false;
    }
    
    saveData.version = SAVE_VERSION;
}

// 导出存档
function exportSave() {
    saveGame();
    const saveData = localStorage.getItem(SAVE_KEY);
    const encoded = btoa(unescape(encodeURIComponent(saveData)));
    
    // 复制到剪贴板
    if (navigator.clipboard) {
        navigator.clipboard.writeText(encoded).then(() => {
            alert(t('saveSuccess'));
        }).catch(() => {
            prompt(t('exportPrompt'), encoded);
        });
    } else {
        prompt(t('exportPrompt'), encoded);
    }
}

// 导入存档
function importSave() {
    const encoded = prompt(t('importPrompt'));
    if (!encoded) return;
    
    try {
        const json = decodeURIComponent(escape(atob(encoded)));
        const saveData = JSON.parse(json);
        
        localStorage.setItem(SAVE_KEY, json);
        loadGame();
        renderUI();
        alert(t('importSuccess'));
    } catch (e) {
        console.error('Import failed:', e);
        alert(t('importFail'));
    }
}

// 重置游戏
function resetGame() {
    if (confirm(t('resetConfirm1'))) {
        if (confirm(t('resetConfirm2'))) {
            localStorage.removeItem(SAVE_KEY);
            resetState();
            clearCachedCards();
            renderUI();
            showFactionModal();
            alert(t('resetDone'));
        }
    }
}

// 自动存档
let autosaveTimer = null;

function startAutosave() {
    if (autosaveTimer) clearInterval(autosaveTimer);
    
    autosaveTimer = setInterval(() => {
        saveGame();
    }, AUTOSAVE_INTERVAL);
}

// 页面关闭时保存
window.addEventListener('beforeunload', () => {
    saveGame();
});

// 页面隐藏时保存
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        saveGame();
    }
});
