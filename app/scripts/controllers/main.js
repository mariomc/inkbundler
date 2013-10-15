'use strict';

angular.module('inkbundlerApp')
  .controller('MainCtrl', function ($scope) {
	$scope.selectedFiles = [];
	$scope.dependentFiles = [];
	$scope.downloading = false;
    $scope.files = [
	  {
	    "name":"Ink Base 1",
	    "url":"Ink/1/lib.js",
	    "dependencies":[]
	  },
	  {
	    "name":"Ink Dom Browser 1",
	    "url":"Ink/Dom/Browser/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Dom Css 1",
	    "url":"Ink/Dom/Css/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Dom Element 1",
	    "url":"Ink/Dom/Element/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Dom Event 1",
	    "url":"Ink/Dom/Event/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Dom FormSerialize 1",
	    "url":"Ink/Dom/FormSerialize/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Dom Loaded 1",
	    "url":"Ink/Dom/Loaded/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Dom Selector 1",
	    "url":"Ink/Dom/Selector/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Namespace StaticModule 1",
	    "url":"Ink/Namespace/StaticModule/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Namespace ClassModule 1",
	    "url":"Ink/Namespace/ClassModule/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Net Ajax 1",
	    "url":"Ink/Net/Ajax/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Net JsonP 1",
	    "url":"Ink/Net/JsonP/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink UI Aux 1",
	    "url":"Ink/UI/Aux/1/lib.js",
	    "dependencies": ["Ink/Net/Ajax/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/Dom/Selector/1/lib.js", "Ink/Util/Url/1/lib.js"]
	  },
	  {
	    "name":"Ink UI Carousel 1",
	    "url":"Ink/UI/Carousel/1/lib.js",
	    "dependencies":["Ink/UI/Aux/1/lib.js","Ink/Dom/Event/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/Dom/Element/1/lib.js","Ink/UI/Pagination/1/lib.js","Ink/Dom/Selector/1/lib.js"]
	  },
	  {
	    "name":"Ink UI Close 1",
	    "url":"Ink/UI/Close/1/lib.js",
	    "dependencies":["Ink/Dom/Event/1/lib.js","Ink/Dom/Element/1/lib.js"]
	  },
	  {
	    "name":"Ink UI DatePicker 1",
	    "url":"Ink/UI/DatePicker/1/lib.js",
	    "dependencies":["Ink/UI/Aux/1/lib.js","Ink/Dom/Event/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/Dom/Element/1/lib.js","Ink/Dom/Selector/1/lib.js","Ink/Util/Array/1/lib.js","Ink/Util/Date/1/lib.js","Ink/Dom/Browser/1/lib.js"]
	  },
	  {
	    "name":"Ink UI Draggable 1",
	    "url":"Ink/UI/Draggable/1/lib.js",
	    "dependencies":["Ink/Dom/Element/1/lib.js","Ink/Dom/Event/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/Dom/Browser/1/lib.js","Ink/Dom/Selector/1/lib.js","Ink/UI/Aux/1/lib.js"]
	  },
	  {
	    "name":"Ink UI Droppable 1",
	    "url":"Ink/UI/Droppable/1/lib.js",
	    "dependencies":["Ink/Dom/Element/1/lib.js","Ink/Dom/Event/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/UI/Aux/1/lib.js","Ink/Util/Array/1/lib.js","Ink/Dom/Selector/1/lib.js"]
	  },
	  {
	    "name":"Ink UI FormValidator 1",
	    "url":"Ink/UI/FormValidator/1/lib.js",
	    "dependencies":["Ink/Dom/Css/1/lib.js","Ink/Util/Validator/1/lib.js"]
	  },
	  {
	    "name":"Ink UI ImageQuery 1",
	    "url":"Ink/UI/ImageQuery/1/lib.js",
	    "dependencies":["Ink/UI/Aux/1/lib.js","Ink/Dom/Event/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/Dom/Element/1/lib.js","Ink/Dom/Selector/1/lib.js","Ink/Util/Array/1/lib.js"]
	  },
	  {
	    "name":"Ink UI Modal 1",
	    "url":"Ink/UI/Modal/1/lib.js",
	    "dependencies":["Ink/UI/Aux/1/lib.js","Ink/Dom/Event/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/Dom/Element/1/lib.js","Ink/Dom/Selector/1/lib.js","Ink/Util/Array/1/lib.js"]
	  },
	  {
	    "name":"Ink UI Pagination 1",
	    "url":"Ink/UI/Pagination/1/lib.js",
	    "dependencies":["Ink/UI/Aux/1/lib.js","Ink/Dom/Event/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/Dom/Element/1/lib.js","Ink/Dom/Selector/1/lib.js"]
	  },
	  {
	    "name":"Ink UI ProgressBar 1",
	    "url":"Ink/UI/ProgressBar/1/lib.js",
	    "dependencies":["Ink/Dom/Selector/1/lib.js","Ink/Dom/Element/1/lib.js"]
	  },
	  {
	    "name":"Ink UI SmoothScroller 1",
	    "url":"Ink/UI/SmoothScroller/1/lib.js",
	    "dependencies":["Ink/Dom/Event/1/lib.js","Ink/Dom/Selector/1/lib.js","Ink/Dom/Loaded/1/lib.js"]
	  },
	  {
	    "name":"Ink UI Spy 1",
	    "url":"Ink/UI/Spy/1/lib.js",
	    "dependencies":["Ink/UI/Aux/1/lib.js","Ink/Dom/Event/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/Dom/Element/1/lib.js","Ink/Dom/Selector/1/lib.js","Ink/Util/Array/1/lib.js"]
	  },
	  {
	    "name":"Ink UI Sticky 1",
	    "url":"Ink/UI/Sticky/1/lib.js",
	    "dependencies":["Ink/UI/Aux/1/lib.js","Ink/Dom/Event/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/Dom/Element/1/lib.js","Ink/Dom/Selector/1/lib.js"]
	  },
	  {
	    "name":"Ink UI Table 1",
	    "url":"Ink/UI/Table/1/lib.js",
	    "dependencies":["Ink/Net/Ajax/1/lib.js","Ink/UI/Aux/1/lib.js","Ink/Dom/Event/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/Dom/Element/1/lib.js","Ink/Dom/Selector/1/lib.js","Ink/Util/Array/1/lib.js","Ink/Util/String/1/lib.js"]
	  },
	  {
	    "name":"Ink UI Tabs 1",
	    "url":"Ink/UI/Tabs/1/lib.js",
	    "dependencies":["Ink/UI/Aux/1/lib.js","Ink/Dom/Event/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/Dom/Element/1/lib.js","Ink/Dom/Selector/1/lib.js","Ink/Util/Array/1/lib.js"]
	  },
	  {
	    "name":"Ink UI Toggle 1",
	    "url":"Ink/UI/Toggle/1/lib.js",
	    "dependencies":["Ink/UI/Aux/1/lib.js","Ink/Dom/Event/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/Dom/Element/1/lib.js","Ink/Dom/Selector/1/lib.js"]
	  },
	  {
	    "name":"Ink UI Toooltip 1",
	    "url":"Ink/UI/Toooltip/1/lib.js",
	    "dependencies":["Ink/UI/Aux/1/lib.js","Ink/Dom/Event/1/lib.js","Ink/Dom/Element/1/lib.js","Ink/Dom/Selector/1/lib.js","Ink/Util/Array/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/Dom/Browser/1/lib.js"]
	  },
	  {
	    "name":"Ink UI TreeView 1",
	    "url":"Ink/UI/TreeView/1/lib.js",
	    "dependencies":["Ink/UI/Aux/1/lib.js","Ink/Dom/Event/1/lib.js","Ink/Dom/Css/1/lib.js","Ink/Dom/Element/1/lib.js","Ink/Dom/Selector/1/lib.js","Ink/Util/Array/1/lib.js"]
	  },
	  {
	    "name":"Ink Util Array 1",
	    "url":"Ink/Util/Array/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Util BinPack 1",
	    "url":"Ink/Util/BinPack/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Util Cookie 1",
	    "url":"Ink/Util/Cookie/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Util Date 1",
	    "url":"Ink/Util/Date/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Util Dumper 1",
	    "url":"Ink/Util/Dumper/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Util I18n 1",
	    "url":"Ink/Util/I18n/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Util Json 1",
	    "url":"Ink/Util/Json/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Util String 1",
	    "url":"Ink/Util/String/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Util Swipe 1",
	    "url":"Ink/Util/Swipe/1/lib.js",
	    "dependencies":["Ink/Dom/Event/1/lib.js"]
	  },
	  {
	    "name":"Ink Util Url 1",
	    "url":"Ink/Util/Url/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  },
	  {
	    "name":"Ink Util Validator 1",
	    "url":"Ink/Util/Validator/1/lib.js",
	    "dependencies":["Ink/1/lib.js"]
	  }
	];
	function minify(codes, options){
	  options = UglifyJS.defaults(options || {}, {
	    warnings     : false,
	    mangle       : {},
	    compress     : {}
	  });
	  if (typeof codes == "string")
	      codes = [ codes ];
	
	  // 1. parse
	  var toplevel = null;
	  codes.forEach(function(code){
	      toplevel = UglifyJS.parse(code, {
	          filename: "?",
	          toplevel: toplevel
	      });
	  });
	  // 2. compress
	  if (options.compress) {
	      UglifyJS.merge({ warnings: options.warnings }, options.compress);
	      toplevel.figure_out_scope();
	      toplevel = toplevel.transform(UglifyJS.Compressor({ warnings: options.warnings }));
	  }
	  // 3. mangle
	  if (options.mangle) {
	      toplevel.figure_out_scope();
	      toplevel.compute_char_frequency();
	      toplevel.mangle_names(options.mangle);
	  }
	  // 4. output
	  var stream = UglifyJS.OutputStream();
	  toplevel.print(stream);
	  return stream.toString();
	}
	$scope.bundle = {
		name : '',
		append : '',
		minify : false
	};
	$scope.$watch('selectedFiles', function(newFiles, oldFiles){
		var dependencies = [];
		for(var i = 0; i < $scope.selectedFiles.length; i++){
		    dependencies = dependencies.concat(_.findWhere($scope.files, {url : $scope.selectedFiles[i]}).dependencies || []);
		}
		$scope.dependentFiles = dependencies;
		}, true);
	$scope.$watch('dependentFiles', function(){
		var to_add = [];
		for(var i = 0; i < $scope.dependentFiles.length; i++){
			if(!_.contains($scope.selectedFiles, $scope.dependentFiles[i])){
				to_add.push($scope.dependentFiles[i]);
			}
		}
		$scope.selectedFiles = _.sortBy(_.uniq(_.union(to_add, $scope.selectedFiles)), function(file){
			var sort_value = _.filter($scope.dependentFiles,function(dependentFile){
				return dependentFile === file;
			}).length;
			return $scope.dependentFiles.length - sort_value;
		});
	}, true);
	$scope.buttonText = function(){
		if(_.contains($scope.dependentFiles, this.file.url)) return "Dependent";
		if(_.contains($scope.selectedFiles, this.file.url)) return "Remove";
		return "Add File";
	};
	$scope.selectedFilter = function(file){
		return _.contains($scope.selectedFiles, file.url);
	};
	$scope.isSelected = function(){
		return _.contains($scope.selectedFiles, this.file.url);
	};
	$scope.isDependent = function(){
		return _.contains($scope.dependentFiles, this.file.url);
	};
	$scope.operation = function(){
		if(_.contains($scope.dependentFiles, this.file.url)) {
			alert("This file is depedent");
			return false;
		}
		if(_.contains($scope.selectedFiles, this.file.url)){
			$scope.selectedFiles = _.without($scope.selectedFiles, this.file.url);
		} else {
			$scope.selectedFiles.push(this.file.url);
		}
	};
	$scope.sortFiles = function(file){
		var sort_value = _.filter($scope.dependentFiles,function(dependentFile){
			return dependentFile === file.url;
		}).length;
		return $scope.dependentFiles.length - sort_value;
	}
	$scope.saveSettings = function(){

	};
	$scope.downloadBundle = function(){
		if($scope.downloading === true){
			alert("Minifying in process. Please wait.");
			return false;
		} else {
			$scope.downloading = true;
			var zip = new JSZip();
			var bundle_string = '';
			var bundle_name = $scope.bundle.name;
			var custom_script = $("#customScript").val();
			_.each($scope.selectedFiles, function(element, index, list){
			  bundle_string += ('\n' + rawFiles.js[element]) || '';
			});

			if($scope.bundle.minify){
			 zip.file(bundle_name.toLowerCase() + '.min.js', minify(bundle_string) + '\n' + custom_script); 
			}
			bundle_string += ('\n' + custom_script);
			zip.file(bundle_name.toLowerCase() + '.js', bundle_string);
			var file = zip.generate({type:"blob"});
			saveAs(file, bundle_name.toLowerCase() + '.zip');
			$scope.downloading = false;
		}

	};
  });