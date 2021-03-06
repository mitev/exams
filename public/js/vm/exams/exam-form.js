define(['js/libs/knockout-2.2.0.js', 'js/libs/lodash.min.js', '/js/models/examtype.js', '/js/models/test.js'], function (ko, _, ExamType, Test) {
    function ExamFormVM(exam, onSave) {
        var self = this;

        self.exam = (typeof exam === "function") ? exam : ko.observable(exam);
        self.onSave = onSave;
        self.examtypes = ko.observableArray([]);
        self.tests = ko.observableArray([]);
        self.availablePlaces = ko.observableArray(['Sofia, Bulgaria', 'Bucharest, Romania']);

        self.loadExamTypes = function () {
            ExamType.getAll(function (data) {
                self.examtypes(data);
                console.log("examtypes are", self.examtypes());
            });
        };

        self.loadTests = function () {
            Test.getAll(function (data) {
                self.tests(data);
                console.log("tests are", self.tests());
            });
        };

        saveExam = function () {
            self.exam().date($('#exam-date').val()); //ugly hack cause the date picker does not work with knockout
            self.exam().save(self.onSave);
            $.modal.current.closeModal();
        };
    }

    return ExamFormVM;
});