// customer service definition:

var formatService = () => {

    var currency = (currencyObject) => {
        return currencyObject.code + ": " + currencyObject.name + " (" + currencyObject.symbol +")";
    };

    var language = (languageObject) => {
        return languageObject.name + "(" + languageObject.nativeName + ")";
    };

    return {
        currency : currency,
        language : language
    };
};

var module = angular.module("worldIndex");

module.factory("formatService", formatService);
