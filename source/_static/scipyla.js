$(document).ready(function(){

    var ENTRY_TEMPLATE = '<div data-date="{date}" class="list-group-item">{title} <a target="_blank" href="{url}">View More</a> <p><small>{date}</small></p></div>';

    var parseMonth = function(month){
        switch(month){
            case "Jun": return 1;
            case "Feb": return 2;
            case "Mar": return 3;
            case "Apr": return 4;
            case "May": return 5;
            case "Jun": return 6;
            case "Jul": return 7;
            case "Aug": return 8;
            case "Sep": return 9;
            case "Oct": return 10;
            case "Nov": return 11;
            case "Dec": return 12;
            default: return 13;
        }
    }

    var sort_feeds = function(){
        load_feeds++;
        if(load_feeds == rss.length){
            var $items = $("#news .list-group-item");

            $items.each(function(idx, elem){
                var $elem = $(elem);
                var dateParts = $elem.data("date").split(" ");
                var timeParts = dateParts[4].split(":");
                var date = new Date(
                    parseInt(dateParts[3]), parseMonth(dateParts[2]), parseInt(dateParts[1]),
                    parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2])
                );
                $elem.attr("data-time", date.getTime());
            });

            $("#news > ul").remove();
            $("#news").append(
                $items.tsort(
                    {data:'time', order: 'desc'}
                ).slice(0, TOTAL_NEWS)
            );
            $("#news_loading").remove();
            $("#news").removeClass("hidden");
        }
    }

    if($("#news").length){
        var load_feeds = 0;
        for(var idx=0; idx < rss.length; idx++){
            var news_for_feed = rss[idx][0];
            var feed = rss[idx][1];
            var conf = {
                    limit: news_for_feed,
                    entryTemplate: ENTRY_TEMPLATE,
                    success: sort_feeds
            };
            $("#news").rss(feed, conf).show();
        }
    }


});
