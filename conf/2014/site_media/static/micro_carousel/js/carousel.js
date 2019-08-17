/**
 * Carousel dynamic generator based on JSON description
 * Taken from Django database (editable though admin ATM).
 * Markup mimics http://getbootstrap.com/2.3.2/javascript.html#carousel
 */
(function (){
    /**
     * Creates a carousel.
     * Assumes the namespace is MICRO_CAROUSEL.AVAILABLE_CAROUSELS, take note that
     * it's generated though a template tag in this application.
     */
    function make_carousel () {
        var $this = $(this),
            name = $(this).attr('name'),
            carousel = MICRO_CAROUSEL.AVAILABLE_CAROUSELS[name],
            // This will be the id
            element_id = name + '_carousel',
            images = null;

        $this.addClass('loading');

        if (carousel == undefined) {
            throw new Exception("Bad carousel");
        }
        if (!carousel.hasOwnProperty('images') || carousel.images.length == 0) {
            throw new Exception("No images in "+name);
        }
        // Now create markup

        var $div = $('<div/>').addClass('carousel slide').attr('id', element_id);
        var $ol = $('<ol/>').addClass('carousel-indicators');
        var $inner = $('<div/>').addClass('carousel-inner');

        // For each row
        $.each(carousel.images, function (index, imgData) {
            var $li = $('<li/>').attr({
                'data-target': '#'+element_id,
                'data-slide-to': index
            });

            var $slide = $('<div/>').addClass('item');

            $slide.append($('<img/>').attr({
                src: imgData.img_src,
                alt: imgData.alt
            }));

            if (imgData.caption) {
                $slide.append($('<div/>').addClass('carousel-caption').html(imgData.caption));
            }

            if (index == 0) {
                $li.addClass('active');
                $slide.addClass('active');
            }
            $ol.append($li);
            $inner.append($slide);
        });

        var $left = $('<a/>').addClass('carousel-control left').attr({
            href: '#'+element_id,
            'data-slide': 'prev'
        }).html('&lsaquo;');

        var $right = $('<a/>').addClass('carousel-control right').attr({
            href: '#'+element_id,
            'data-slide': 'next'
        }).html('&rsaquo;');

        //$div.append($ol);
        $div.append($inner);
        $div.append($left);
        $div.append($right);

        $this.append($div);
        // Init movement
        console.info("Launching carousel with ", carousel.interval);
        $div.carousel({
            interval: carousel.interval
        });
        $this.removeClass('loading');
    }

    function initialize () {
        $('.micro_carousel').each(make_carousel);
    }

    $(initialize);
})();