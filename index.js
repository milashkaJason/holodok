const spinner = document.querySelector('.ymap-container').children[0];
let check_if_load = false;

function init() {
    const myMap = new ymaps.Map('map', {
        center: [53.839902, 27.544869],
        zoom: 17
    });

    const myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point",
            coordinates: [53.839902, 27.544869]
        }
    });

    myMap.geoObjects.add(myGeoObject);

    const layer = myMap.layers.get(0).get(0);

    waitForTilesLoad(layer).then(function() {
        spinner.classList.remove('is-active');
    });
}

function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
        let tc = getTileContainer(layer), readyAll = true;
        tc.tiles.each(function (tile, number) {
            if (!tile.isReady()) {
                readyAll = false;
            }
        });
        if (readyAll) {
            resolve();
        } else {
            tc.events.once("ready", function() {
                resolve();
            });
        }
    });
}

function getTileContainer(layer) {
    for (var k in layer) {
        if (layer.hasOwnProperty(k)) {
            if (
                layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
            ) {
                return layer[k];
            }
        }
    }
    return null;
}

function loadScript(url, callback){
    const script = document.createElement("script");

    if (script.readyState){
        script.onreadystatechange = function(){
            if (script.readyState === "loaded" ||
                script.readyState === "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

const ymap = function() {
    document.querySelector('.ymap-container').addEventListener('mouseenter', function(){
        if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

            // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
            check_if_load = true;

            // Показываем индикатор загрузки до тех пор, пока карта не загрузится
            spinner.classList.add('is-active');

            // Загружаем API Яндекс.Карт
            loadScript("https://api-maps.yandex.ru/2.1/?apikey=c31d9a3b-860a-41f0-b8fb-708a953e14c3&lang=ru_RU", function(){
                // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
                ymaps.load(init);
            });
        }
    })
}

ymap();