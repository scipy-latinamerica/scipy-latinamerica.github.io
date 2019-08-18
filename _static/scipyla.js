$(document).ready(function(){

    var ENTRY_TEMPLATE = '<div data-date="{date}" class="list-group-item">{title} <a target="_blank" href="{url}">View More</a> <p><small>{date}</small></p></div>';

    var parseMonth = function(month){
        switch(month){
            case "Jun": return 0;
            case "Feb": return 1;
            case "Mar": return 2;
            case "Apr": return 3;
            case "May": return 4;
            case "Jun": return 5;
            case "Jul": return 6;
            case "Aug": return 7;
            case "Sep": return 8;
            case "Oct": return 9;
            case "Nov": return 10;
            case "Dec": return 11;
            default: return -1000;
        }
    }

    var sort_feeds = function(){
        load_feeds++;
        if(load_feeds == rss.length){
            var $items = $("#news .list-group-item");

            $items.tsort({
                data:'date',
                order: 'desc',
                sortFunction: function(a, b){
                    var dateParts = a.s[0].split(" ");
                    var timeParts = dateParts[4].split(":");
                    var dateA = new Date(
                        parseInt(dateParts[3]), parseMonth(dateParts[2]), parseInt(dateParts[1]),
                        parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2])
                    );

                    var dateParts = b.s[0].split(" ");
                    var timeParts = dateParts[4].split(":");
                    var dateB = new Date(
                        parseInt(dateParts[3]), parseMonth(dateParts[2]), parseInt(dateParts[1]),
                        parseInt(timeParts[0]), parseInt(timeParts[1]), parseInt(timeParts[2])
                    );
                    if(dateA < dateB)
                        return 1
                    else if(dateA > dateB)
                        return -1
                    return 0
                }
            }).slice(0, TOTAL_NEWS);
            $("#news > ul").remove();
            $("#news").append($items);
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
