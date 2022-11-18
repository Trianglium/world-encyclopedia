(function(){
var app = angular.module("worldIndex", ["ngRoute"]);

app.controller("appController", ($scope, $http, formatService) => {

    $http.get("https://restcountries.eu/rest/v2/all?fields=name;alpha3Code")
    .then((response) => {
        $scope.countries = response.data;
    });

    $scope.onCountryChange = () => {
        // console.log("The country changed to " + $scope.countrySelected);

        $scope.receivedData = null;
        $http.get("https://restcountries.eu/rest/v2/alpha/" + $scope.countrySelected.alpha3Code)
        .then((response) => {
            console.log(response.data);
            $scope.receivedData = response.data;
        });
    };

    $scope.formatCurrency = (currency) => {
        return formatService.currency(currency);
    };

    $scope.formatLanguage = (language) => {
        return formatService.language(language);
    };

})
.directive("mapDir", () => {
    console.log("directive called");
    
    return {
        restrict: "A",
        link: ($scope) => {

            const placeholder = document.getElementById("map");
            placeholder.innerHTML = "";

            const area = $scope.receivedData.area == null ? 10 : $scope.receivedData.area;

            var map = new ol.Map({
                target: 'map',
                layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
                ],
                view: new ol.View({
                center: ol.proj.fromLonLat([$scope.receivedData.latlng[1], $scope.receivedData.latlng[0]]),
                zoom: 10 - Math.log10(area) - Math.abs($scope.receivedData.latlng[0])/90
                })
            });       
        }
    }
});
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.config(
    ($routeProvider) => {

    $routeProvider
    .when("/", {
        templateUrl : "stats.html"
    })
    .when("/atlas", {
        templateUrl : "atlas.html"
    });

}
);

})();