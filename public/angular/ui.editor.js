
/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.editor', [])
    .value('uiEditorConfig', {})
    .directive('uiEditor', ['uiEditorConfig', function(uiEditorConfig) {
    uiEditorConfig = uiEditorConfig || {};
    var generatedIds = 0;
    return {
        require: '?ngModel',
        link: function(scope, elm, attrs, ngModel) {
            var expression, options, tinyInstance;
            // generate an ID if not present
            if (!attrs.id) {
                attrs.$set('id', 'uiEditor' + generatedIds++);
            }
            options = {
                // Update model when calling setContent (such as from the source editor popup)
                setup: function(ed) {
                    ed.on('init', function(args) {
                        ngModel.$render();
                    });
                    // Update model on button click
                    ed.on('ExecCommand', function(e) {
                        ed.save();
                        ngModel.$setViewValue(elm.val());
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    });
                    // Update model on keypress
                    ed.on('KeyUp', function(e) {
                        console.log(ed.isDirty());
                        ed.save();
                        ngModel.$setViewValue(elm.val());
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    });
                },
                mode: 'exact',
                elements: attrs.id
            };
            if (attrs.uiEditor) {
                expression = scope.$eval(attrs.uiEditor);
            } else {
                expression = {};
            }
            setTimeout(function() {
                $('.wymeditor').wymeditor();
            });


            // ngModel.$render = function() {
            //   console.log("render")
            //     if (!tinyInstance) {
            //         tinyInstance = tinymce.get(attrs.id);
            //     }
            //     if (tinyInstance) {
            //         tinyInstance.setContent(ngModel.$viewValue || '');
            //     }
            // };
        }
    };
}]); 