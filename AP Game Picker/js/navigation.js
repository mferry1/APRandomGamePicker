
document.addEventListener('DOMContentLoaded', () => {
    const homePage = document.getElementById('homePage');
    const gamesandtagsPage = document.getElementById('gamesandtagsPage');
    const rulesettingsPage = document.getElementById('rulesettingsPage');
    const datamanagementPage = document.getElementById('datamanagementPage');
    const gamepickerPage = document.getElementById('gamepickerPage');

    function refreshPage(page) {
        switch (page) {
            case '#gamesandtags':
                updateTotalGamesLabel();
                updateTotalTagsLabel();
                updateAddGamesTabTagCheckboxes();
                updateGamesTabGamesList();
                break;
            case '#rulesettings':
                updateChooseAGameOrTagSelect();
                updateRulePresetSelect();
                updateRuleDefinitionSelect();
                checkForValidRule();
                updateCurrentRulesList();
                break;
            case '#gamepicker':
                updateInactiveGamesList();
                updateActiveGamesList();
                updateInactiveRulesList();
                updateActiveRulesList();
                updateActiveGamesAndRulesLabel();
                updateSelectionSummary();
                updateClearGamesButton();
                updatePickedGamesView();
                break;
        }
    }

    function navigate() {
        const page = window.location.hash;

        homePage.hidden = page !== '';
        gamesandtagsPage.hidden = page !== '#gamesandtags';
        rulesettingsPage.hidden = page !== '#rulesettings';
        datamanagementPage.hidden = page !== '#datamanagement';
        gamepickerPage.hidden = page !== '#gamepicker';

        refreshPage(page);
    }

    window.addEventListener('hashchange', navigate);

    navigate();
});
