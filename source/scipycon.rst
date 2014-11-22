===================
SciPyLa Conferences
===================


.. raw:: html

    <script>
        var IFRAME_URL = "http://scipycon.com.ar/";
        var REMOVE_H1 = true;
    </script>

    <a id="remove-frame" class="btn pull-right btn-mini"/>Quitar Marco</a>
    <iframe id="embed"
        style="overflow-y: scroll;"
        src=""
        scrolling="no"
        frameborder="0"
        width="100%"
        height="700">
    </iframe>

    <script>
        $(document).ready(function(){

            if(REMOVE_H1){
                $("h1").hide();
            };

            $("#embed").attr('src', IFRAME_URL);

            $("#remove-frame").click(function(evt){
                window.location.replace(IFRAME_URL);
            });

        });
    </script>

