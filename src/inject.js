chrome.runtime.onMessage.addListener(function (request) {
    if (request.result.length > 0) {
        var body = $('body');
        CharlieDisplay.init(request.result);
        body.append(CharlieDisplay.modal.element).on('click', CharlieDisplay.modal.close, function (e) {
            CharlieDisplay.destroy();
            e.preventDefault();
        });

        body.keyup(function (e) {
            if (e.keyCode === 27) {
                CharlieDisplay.destroy();
            }
        });
    }
});

var CharlieDisplay = {
    data: [],
    init: function (result) {
        CharlieDisplay.data = result;
        CharlieDisplay.table.init();
        CharlieDisplay.modal.init();
        CharlieDisplay.modal.element
            .find(CharlieDisplay.modal.body)
            .append(CharlieDisplay.table.element);
    },
    table: {
        element: $('<table id="charlie-table" />'),
        init: function () {
            for (var i = 0; i < CharlieDisplay.data.length; i++) {
                var row = $('<tr/>');
                row.append($('<td>' + CharlieDisplay.data[i].letter + '</td>'));
                row.append($('<td>' + CharlieDisplay.data[i].telephony + '</td>'));
                CharlieDisplay.table.element.append(row);
            }
            return CharlieDisplay.table.element;
        }
    },
    modal: {
        close: '.charlie-close',
        body: '.charlie-modal-body',
        element: null,
        init: function () {
            CharlieDisplay.modal.element = $('<div class="charlie-modal" aria-hidden="true"><div class="charlie-modal-dialog"><div class="charlie-modal-header"><h2>Charlie says:</h2><a href="#" class="charlie-close" aria-hidden="true">×</a></div><div class="charlie-modal-body"></div></div></div>');
        }
    },
    destroy: function () {
        if (CharlieDisplay.table.element !== null && CharlieDisplay.modal.element !== null) {
            CharlieDisplay.table.element.html('').remove();
            CharlieDisplay.modal.element.remove();
            CharlieDisplay.data = [];
        }
    }
};