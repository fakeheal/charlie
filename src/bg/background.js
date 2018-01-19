chrome.contextMenus.create({
    "title": 'Charlie, Help!', "contexts": ["selection"],
    "onclick": function (info, tab) {
        var selection = info.selectionText;
        chrome.tabs.sendMessage(tab.id, {
            result: Charlie.spell(selection)
        });
    }
});

var Charlie = {
    spell: function (word) {
        var result = [], letter;
        for (var i = 0; i < word.length; i++) {
            letter = word[i].toUpperCase();
            result.push({
                letter: letter,
                telephony: Charlie.dictionary.hasOwnProperty(letter) ? Charlie.dictionary[letter] : letter
            });
        }
        return result;
    },
    dictionary: {
        A: 'Alpha',
        B: 'Bravo',
        C: 'Charlie',
        D: 'Delta',
        E: 'Echo',
        F: 'Foxtrot',
        G: 'Golf',
        H: 'Hotel',
        I: 'India',
        J: 'Juliet',
        K: 'Kilo',
        L: 'Lima',
        M: 'Mike',
        N: 'November',
        O: 'Oscar',
        P: 'Papa',
        Q: 'Quebec',
        R: 'Romeo',
        S: 'Sierra',
        T: 'Tango',
        U: 'Uniform',
        V: 'Victor',
        W: 'Whiskey',
        X: 'X-ray',
        Y: 'Yankee',
        Z: 'Zulu',
        1: 'One',
        2: 'Two',
        3: 'Three',
        4: 'Four',
        5: 'Five',
        6: 'Six',
        7: 'Seven',
        8: 'Eight',
        9: 'Nine',
        0: 'Zero',
        ' ': 'SPACE'
    }
};