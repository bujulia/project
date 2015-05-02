(function(w, d3, undefined){
    "use strict";

    var width, height;
    function getSize(){
        width = w.innerWidth,
        height = w.innerHeight;

        if(width === 0 || height === 0){
            setTimeout(function(){
                getSize();
            }, 100);
        }
        else {
            init();
        }
    }

    function init(){

        // Setup path for outerspace
        var space = d3.geo.azimuthal()
            .mode("equidistant") // Outerspace has a equidistant projection
            .translate([width / 2, height / 2]);

        space.scale(space.scale() * 3);

        var spacePath = d3.geo.path()
            .projection(space)
            .pointRadius(1);

        // Setup path for globe
        var Globe = d3.geo.azimuthal()
            .mode("orthographic") // Globe has a orthographic projection
            .translate([width / 2, height / 2.25]);

        var scale0 = Globe.scale();

        var path = d3.geo.path()
            .projection(Globe)
            .pointRadius(2)

        Globe.scale(Globe.scale() * 1.5);

        // Setup path for sun
        var Sun = d3.geo.azimuthal()
            .mode("orthographic") // Sun has a orthographic projection
            .translate([width / 2, height / 2]);

        var scale1 = Sun.scale();

        var path1 = d3.geo.path()
            .projection(Sun)
            .pointRadius(2)

        Sun.scale(Sun.scale() / 5);

        // Setup zoom behavior
        var zoom = d3.behavior.zoom(true)
            .translate(Globe.origin())
            .scale(Globe.scale())
            .scaleExtent([Globe.scale(), 700])
            .on("zoom", move);

        var circle = d3.geo.greatCircle();

        var svg = d3.select("body")
            .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                    .call(zoom)
                    .on("dblclick.zoom", null);

        // Create a list of stars and the sun and add them to outerspace
        var starList1 = createStars(1000);
                
        var stars = svg.append("g")
            .selectAll("g")
            .data(starList1)
            .enter()
            .append("path")
                .attr("class", "star")
                .attr("d", function(d){
                    spacePath.pointRadius(d.properties.radius);
                    return spacePath(d);
                });

        // Create the Sun
        var Sun = svg.append("circle")
            .attr('cx', 1240)
            .attr('cy', 160)
            .attr('r', Sun.scale())
            .attr('class', 'Sun')
            .attr("filter", "url(#glowSun)")
            .attr("fill", "url(#gradSun)");

        svg.append("rect")
            .attr("class", "frame")
            .attr("width", width)
            .attr("height", height);

        // Create the base globe
        var backgroundCircle = svg.append("circle")
            .attr('cx', width / 2)
            .attr('cy', height / 2.25)
            .attr('r', Globe.scale())
            .attr('class', 'globe')
            .attr("filter", "url(#glow)")
            .attr("fill", "url(#gradBlue)");

        var g = svg.append("g"),
            features;

        // Add all the countries to the globe
            d3.json("world-countries.json", function(collection) {
            features = g.selectAll(".feature").data(collection.features)
            

            features.enter().append("path")
                .attr("class", "feature")
                .attr("d", function(d){ return path(circle.clip(d)); })
                
                // Go from the globe to the 2D map by clicking on the continents
                .on("click",function(){
                    window.location.href='atlas.html#map';
                });
            });


        // Redraw all items with new projections
        function redraw(){
            features.attr("d", function(d){
                return path(circle.clip(d));
            });

            stars.attr("d", function(d){
                spacePath.pointRadius(d.properties.radius);
                return spacePath(d);
            });
        }

        // Rotation of the earth only in the horizontal direction
        function move() {
            if(d3.event){
                var scale = d3.event.scale;
                var origin = [d3.event.translate[0] * -1, 0];
                
                Globe.scale(scale);
                space.scale(scale * 3);
                backgroundCircle.attr('r', scale);
                path.pointRadius(2 * scale / scale0);

                Globe.origin(origin);
                circle.origin(origin);
                
                // Globe and stars spin in the opposite direction because of the projection mode
                
                //var spaceOrigin = [origin[0] * -1, origin[1] * -1];
                //space.origin(spaceOrigin);
                redraw();
            }
        }

        // Function that creates stars
        function createStars(number){
            var data = [];
            for(var i = 0; i < number; i++){
                data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: randomLonLat()
                    },
                    type: 'Feature',
                    properties: {
                        radius: Math.random() * 1.5
                    }
                });
            }
            return data;
        }        

        // Randomizing the position of the stars
        
        function randomLonLat(){
            return [Math.random() * 360 - 180, Math.random() * 180 - 90];
        }

        function sunPlace(){
            
            return ;
        }
    }
    

    getSize();

}(window, d3));