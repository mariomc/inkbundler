'use strict';

var UglifyJS = require('uglify-js');

angular.module('inkbundlerApp')
.controller('MainCtrl', function ($scope, $http, $q, localStorageService) {
    var default_bundle = function(){
        return {
            name : '',
            prepend : '',
            append : '',
            minify : false,
            sourceMap: false,
            selectedFiles: []
        };
    };
    window.http = $http;
    function isDependent(url){
        return  _.contains($scope.dependentFiles, url);
    }

    function uglify(files, options, name) {
        options = UglifyJS.defaults(options, {
            outSourceMap : null,
            sourceRoot   : null,
            inSourceMap  : null,
            fromString   : false,
            warnings     : false,
            mangle       : {},
            output       : null,
            compress     : {}
        });
        if (typeof files == 'string')
            files = [ files ];

        UglifyJS.base54.reset();

        // 1. parse
        var toplevel = null;
        files.forEach(function(file){
            var code = options.fromString
                ? file
                : fs.readFileSync(file, 'utf8');
            toplevel = UglifyJS.parse(code, {
                filename: options.fromString ? name : file,
                toplevel: toplevel
            });
        });

        // 2. compress
        if (options.compress) {
            var compress = { warnings: options.warnings };
            UglifyJS.merge(compress, options.compress);
            toplevel.figure_out_scope();
            var sq = UglifyJS.Compressor(compress);
            toplevel = toplevel.transform(sq);
        }

        // 3. mangle
        if (options.mangle) {
            toplevel.figure_out_scope();
            toplevel.compute_char_frequency();
            toplevel.mangle_names(options.mangle);
        }

        // 4. output
        var inMap = options.inSourceMap;
        var output = {};
        if (typeof options.inSourceMap == 'string') {
            inMap = fs.readFileSync(options.inSourceMap, 'utf8');
        }
        if (options.outSourceMap) {
            output.source_map = UglifyJS.SourceMap({
                file: options.outSourceMap,
                orig: inMap,
                root: options.sourceRoot
            });
        }
        if (options.output) {
            UglifyJS.merge(output, options.output);
        }
        var stream = UglifyJS.OutputStream(output);
        toplevel.print(stream);
        return {
            code : stream + '',
            map  : output.source_map + ''
        };
    }

    function minify(settings){
        var name = settings.name;
        var codes = settings.codes;
        var minified = '';
        var sourceMap = '';

        if(settings.minify){
            var code = uglify(codes.join('\n'), {fromString: true, outSourceMap: name + '.map.js'  }, name + '.js');
            sourceMap = code.map;
            minified = code.code;
            
        }
          return {
            code: codes.join('\n'),
            minified: minified,
            sourceMap: sourceMap,
          };
    }

    function getScript(url){
        return $scope.files.js[url];
    }
    function getAllTheScripts($index){
        var output = [];

        for(var i = 0; i < $scope.bundles[$index].selectedFiles.length; i++){
          var url = $scope.bundles[$index].selectedFiles[i];
          if($scope.files.js[url]) {
            continue;
          } else {
            output.push($http.get('http://jsproxy.eu01.aws.af.cm/index.php?url='+url));
          }
        }
        window.cenas = output;
        return $q.all(output).then(function(response){
            _.each(response, function(element, index){
                var url = element.config.url.split("url=")[1];
                $scope.files.js[url] = element.data;
            });
            console.log($scope.files.js);
        });
    };
    function importBundle(bundle){
        var errors = [];
        var importedBundle = {};
        if(!bundle.name){
            errors.push('No bundle name');
        }
        if(!bundle.selectedFiles){
            errors.push('No selected files');
        }
        if(errors.length > 0){
            alert(errors.join('\n'))
        } else {
            importedBundle = {
                name : bundle.name,
                selectedFiles : bundle.selectedFiles,
                minify : bundle.minify || false,
                sourceMap : bundle.sourceMap || false,
                append : bundle.append || '',
                prepend : bundle.prepend || '',
            };
            console.log($scope.bundles);
            $scope.bundles.push(importedBundle);
            $scope.updating = $scope.bundles[$scope.bundles.length - 1];
        }
    }

    $scope.bundle = default_bundle();

    $scope.import = function(){
        var to_import = {};
        try{
            to_import = JSON.parse($scope.importString);
            importBundle(to_import);
        } catch(e){
            alert('Invalid JSON');
            return;
        }

    };

    $scope.selectOptions = {
        formatNoMatches: function(term){
            var http = new RegExp('^(http|https)://', 'i');
            return http.test(term) ? 'Insert a URL for a JS or JSON file' : 'No matches found';
        },
        createSearchChoice: function(term){
            var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?.js/gi;
            var regex = new RegExp(expression);
            if (term.match(expression) )
            {
                return {id: term, text: term};
            } else {
                return;
            }
        },
        tags: function(){
            var ret = [];
            _.each($scope.dependencies, function(elem, index){
                ret.push({
                    id: index,
                    text: index,
                    locked: isDependent(index),
                    dependencies: elem
                });
            });
            return ret;
        },

    };

    $scope.downloading = false;
    $scope.files = {js: {}};
    $scope.bundles = localStorageService.get('bundles') || [];
    $scope.dependencies = [];
    $scope.bundleFile = '';
    $scope.updating = false;
    $scope.cenas = '';

    $http.get('dependencies.json').then(function(res){
        $scope.dependencies = res.data.Ink;
    });

    $http.get('files.json').then(function(res){
        $scope.files = _.extend($scope.files, res.data);
    });

    $scope.$watch('bundles', function(newBundles, oldBundles){
        localStorageService.add('bundles', newBundles);
    }, true);

    $scope.$watch('bundle', function(newBundle, oldBundle){
        var dependencies = [];
        for(var i = 0; i < newBundle.selectedFiles.length; i++){
            dependencies = dependencies.concat($scope.dependencies[$scope.bundle.selectedFiles[i]] || []);
        }
        $scope.dependentFiles = dependencies;
        $('#selectBox').select2('val', $scope.bundle.selectedFiles);
        $scope.cenas = $scope.bundle.selectedFiles.join('\n');
    }, true);

    $scope.$watch('cenas', function(newText, oldText){
        $scope.bundle.selectedFiles = newText.split('\n');
    });

    $scope.$watch('dependentFiles', function(){
        $('#sortable .select2-container').select2('container').find('ul.select2-choices').sortable({
            containment: 'parent',
            items: '>li',
            start: function(a, b) {
                $('#sortable .select2-container')
                .select2('onSortStart');
                $('.select2-search-field').css('display', 'list-item');

            },
            update: function(a, b) {
                $('#sortable .select2-container')
                .select2('onSortEnd');
                $('.select2-search-field').css('display', 'list-item');
            }
        });
        var to_add = [];
        if(!$scope.bundle) return false;
        for(var i = 0; i < $scope.dependentFiles.length; i++){
            if(!_.contains($scope.bundle.selectedFiles, $scope.dependentFiles[i])){
                to_add.push($scope.dependentFiles[i]);
            }
        }
        $scope.bundle.selectedFiles = _.sortBy(_.uniq(_.union(to_add, $scope.bundle.selectedFiles)), function(file){
            var sort_value = _.filter($scope.dependentFiles,function(dependentFile){
                return dependentFile === file;
            }).length;
            return $scope.dependentFiles.length - sort_value;
        });
    }, true);

    $scope.size = function(selectedFiles){
        if(selectedFiles.length == 1){
            return (selectedFiles[0] === '' ? 0 : 1);
        } else {
            return selectedFiles.length;
        }
    };

    $scope.selectedFilter = function(files){
        var result = {};
        _.each($scope.bundle.selectedFiles, function(element, index){
            result[element] = $scope.dependencies[element];
        });
        return result;
    };

    $scope.removeBundle = function($index) {
        var conf = confirm('Are you sure you want to delete this bundle?');
        if(conf){
            $scope.bundles.splice($index,1);
            $scope.bundle = default_bundle();
            $scope.updating = false;
        }
    };

    $scope.saveBundle = function(updating) {
        if(updating !== false){
        } else {
            $scope.bundles.push($scope.bundle);
        }
        $scope.updating = false;
        $scope.bundle = default_bundle();
    };

    $scope.loadBundle = function($index) {
        $scope.bundle = $scope.bundles[$index];
        $scope.updating = $index;
    };

    $scope.test = function(stuff){
        var val = $('#selectBox').select2('val');
        $scope.bundle.selectedFiles = val;
    };

    $scope.downloadBundle = function($index){
        $scope.downloading = $index;
        var zip;
        var bundle = $scope.bundles[$index];
        var name = bundle.name.toLowerCase().replace(/ /g,'_');
        
        getAllTheScripts($index).then(function(result){
            var contents = [];
            var min = bundle.minify;
            var bundleConfig = {
                name: bundle.name,
                selectedFiles: bundle.selectedFiles,
                minify: bundle.minify,
                sourceMap : bundle.sourceMap,
                prepend: bundle.prepend,
                append: bundle.append
            };
            if(bundle.prepend){
               contents[contents.length] = bundle.prepend; 
            }
            _.each(bundle.selectedFiles, function(url, index, list){
              contents[contents.length] = $scope.files.js[url];
            });

            if(bundle.append){
               contents[contents.length] = bundle.append; 
            }
            
            zip = new JSZip();

            var mini =  minify({
                codes: contents,
                minify: min,
                name: name
            });

            if(min){
                if(bundle.sourceMap){
                    zip.file(name + '.js.map', mini.sourceMap);
                    mini.minified = mini.minified + '\n'+ '//@ sourceMappingURL='+encodeURIComponent(name)+'.js.map';
                }
                zip.file(name + '.min.js', mini.minified);
            }


            zip.file(name + '.js', mini.code);
            zip.file('import.json', JSON.stringify(bundleConfig, null, 4)); 

            var file = zip.generate({type:'blob'});
            saveAs(file, name + '.zip');
            $scope.downloading = false;

          }, function(error){
            console.log('error', error);

          },
          function(stuff){
            console.log(stuff);
          });
    };
});