var token = 'pk.eyJ1Ijoid2FrYXJpc2FtYSIsImEiOiJja2N4cHFmamIwMmNjMnhxeWxma2p1cTN0In0.q2rksUfn35RmbDehCh797w';

        var littleton = L.marker([-22.906121, -43.176934]).bindPopup('Boa Tardê, RJ.');
        var varileton = L.marker([-22.8808, -43.1043]).bindPopup('Testando popUp, RJ.');   
        
        var cities = L.layerGroup([littleton,varileton]);

        var grayscale = L.tileLayer(
          'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=' + token ,{
            tileSize: 512,
            zoomOffset: -1,
            attribution: 'Map data &copy; ' + mapLink
          }
        ),  streets   = L.tileLayer ('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');     
        
        var map = L.map('location-map', { 
            center: [-22.906121, -43.176934],
            zoom: 10,
           layers: [grayscale, cities]
            });

        var baseMaps = {
          "Grayscale": grayscale,
          "Streets": streets
        };

        var overlayMaps = {
            "Cities": cities
        };
        

      var baseMaps = {
      "<span style='color: gray'>Satélite</span>": grayscale,
      "Normal": streets
      };

      L.control.layers(baseMaps, overlayMaps).addTo(map);

       //Geolocation teste
       function localizar(){
        map.locate({setView: true, maxZoom: 15});
       }
  

       map.on('click', setmark);
       var t = "";

       function setmark(e){
        var r = confirm("Deseja marcar uma posição no mapa?");
          if (r == true) {
            var person = prompt("Digite uma descrição:", "");
            if (person.trim() === null || person.trim() === ""){
              alert("Descricação não pode ser vazia.")
            }else{
              var newMarker = new L.marker(e.latlng).bindPopup(person).addTo(map).on('click', onClick);
              t = person;  
            }
          }
       }
        map.on('locationfound', onLocationFound);

        function onLocationFound(e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map)
        .on('click', function(){
          confirm("are you sure?");
        });
        L.circle(e.latlng, radius).addTo(map);
        }

        function onClick(e) {
         var coord = document.getElementById('coord');
         var desc = document.getElementById('desc');

         coord.innerText = (this.getLatLng() + "").replace("LatLng(","").replace(")","");
         desc.innerText = t;
        

        var modal = document.getElementById('modalGeolocation');

        modal.click();
        
        }