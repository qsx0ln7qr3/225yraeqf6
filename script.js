function OnLoad()
{
    
    document.getElementById("close").addEventListener('click', (event) => {document.getElementById("popup").style.display = "none";});
    
    //$(document).keydown(function(e)
    //{
    //    if (e.key === "Escape")
    //    {
    //        document.getElementById("popup").style.display = "none";    //closes the popup
    //    }
    //});
        
    LoadMore();

    FillContainer();
}

function LoadMore()
{
    var count = document.getElementById("container").childElementCount;

    var items_between_ads_count = 17;
    
    if (count % items_between_ads_count == 0)
        {
            LoadAd();
        }
    else
        {
            LoadItem();
        }
}

function LoadAd()
    {
        var template = document.getElementById("ad_template");

        var clone = template.content.cloneNode(true).firstElementChild;
        
        document.getElementById("container").appendChild(clone);

        var url = GetRandomAdImageSrc();

        if (url != null)
        {
            clone.getElementsByTagName("img")[0].src = url;
        }        
    }

function LoadItem()
{
        var template = document.getElementById("item_template");

        var clone = template.content.cloneNode(true).firstElementChild;
        
        document.getElementById("container").appendChild(clone);
        
        var cloud = GetRandomCloudSrc();
        
        var artist = cloud.substring(0, cloud.indexOf("/"));
        
        var album = cloud.substring(cloud.indexOf("/") + 1, cloud.indexOf("/", artist.length + 1));
        
        var song = cloud.substring(cloud.lastIndexOf("/") + 1, cloud.lastIndexOf("."));
        
        var cover = cloud.substring(0, cloud.lastIndexOf("/")) + '/';

        clone.getElementsByTagName("img")[0].src = 'data/' + cloud;
        
        clone.getElementsByTagName("img")[1].src = 'data/' + cover + 'Cover.jpg';
        
        clone.getElementsByTagName("img")[0].setAttribute("alt", "cooking pork and onions");    //The alt attribute of this tag tells search engines the picture is about cooking pork with onions.
                
        clone.setAttribute("artist", artist);
        
        clone.setAttribute("album", album);
        
        clone.setAttribute("song", song);
        
        clone.setAttribute("cloud", ('data/' + cloud));
        
        clone.setAttribute("cover", ('data/' + cover + 'Cover.jpg'));

        clone.addEventListener('click', (event) => {OpenPopup(clone);});
        
        clone.getElementsByTagName("div")[0].innerText = artist + " - " + song;

    }


function OpenPopup(clone)
{
   
    var popup = document.getElementById("popup");

    popup.style.display = "block";
        
    var artist = clone.getAttribute("artist");
    
    var album = clone.getAttribute("album");
    
    var song = clone.getAttribute("song");
    
    var cloud = clone.getAttribute("cloud");
    
    var cover = clone.getAttribute("cover");

    document.getElementById("popup_image").src = cloud;
    
    document.getElementById("popup_description").innerText = artist + " - " + song + " (" + album + ")";
    
}


window.onclick = function(event)
{
    var popup = document.getElementById("popup");
    
    if (event.target == popup)
        {
            popup.style.display = "none";
        }
}


function GetRandomAdImageSrc()
    {
        return;

        var Url =
            [
                '336x280-1.gif',
                '336x280-2.gif',
                '336x280-4.gif',
            ];
    
        var index = Math.floor(Math.random() * Url.length);
    
        return "ads_images/" + Url[index];
    }

function GetRandomCloudSrc()
    {

        var Url =
            [
                "Red Hot Chili Peppers/By The Way/By The Way (Album).png",
                "Red Hot Chili Peppers/By The Way/By The Way.png",
                "Red Hot Chili Peppers/By The Way/Universally Speaking.png",
                "Red Hot Chili Peppers/By The Way/This Is The Place.png",
                "Red Hot Chili Peppers/By The Way/Dosed.png",
                "Red Hot Chili Peppers/By The Way/Don't Forget Me.png",
                "Red Hot Chili Peppers/By The Way/The Zephyr Song.png",
                "Red Hot Chili Peppers/By The Way/Can't Stop.png",
                "Red Hot Chili Peppers/By The Way/I Could Die For You.png",
                "Red Hot Chili Peppers/By The Way/Midnight.png",
                "Red Hot Chili Peppers/By The Way/Throw Away Your Television.png",
                "Red Hot Chili Peppers/By The Way/Cabron.png",
                "Red Hot Chili Peppers/By The Way/Tear.png",
                "Red Hot Chili Peppers/By The Way/On Mercury.png",
                "Red Hot Chili Peppers/By The Way/Minor Thing.png",
                "Red Hot Chili Peppers/By The Way/Warm Tape.png",
                "Red Hot Chili Peppers/By The Way/Venice Queen.png",                
                "Backstreet Boys/Black And Blue/Everyone.png",                
                "Backstreet Boys/Black And Blue/Get Another Boyfriend.png",                
                "Backstreet Boys/Black And Blue/Larger Than Life.png",                
                "Backstreet Boys/Black And Blue/Shape Of My Heart.png",                
                "Backstreet Boys/Black And Blue/The Call.png",                
                "The Weeknd/After Hours/Alone Again.png",                
                "The Weeknd/After Hours/Blinding Lights.png",                
                "The Weeknd/After Hours/Faith.png",                
                "The Weeknd/After Hours/Save Your Tears.png",                
                "The Weeknd/After Hours/Too Late.png",                
            ];
    
        var index = Math.floor(Math.random() * Url.length);
    
        return Url[index];
    
    }
    
window.onresize = function()
    {
        FillContainer();
    }

$(window).scroll(function()
{
    if($(window).scrollTop() + $(window).height() > ($(document).height() - 20))
    {
        LoadFullRow();
    }
});

function FillContainer()

    {
        while (document.getElementById("container").clientHeight < window.innerHeight)
        {
            LoadFullRow();
        }
    }

function LoadFullRow()
{
    var load_count = LoadHowMany();

    for (let i = 0; i < load_count; i++)
    {
        LoadMore();
    } 
}

function LoadHowMany()
    {
        //total number of element
        var n_t = document.querySelectorAll('.item').length;
        //width of an element
        var w = parseInt(document.querySelector('.item').offsetWidth);
        //full width of element with margin
        var m = document.querySelector('.item').currentStyle || window.getComputedStyle(document.querySelector('.item'));
        w = w + parseInt(m.marginLeft) + parseInt(m.marginRight);
        //width of container
        var w_c = parseInt(document.querySelector('#container').offsetWidth);
        //padding of container
        var c = document.querySelector('#container').currentStyle || window.getComputedStyle(document.querySelector('#container'));
        var p_c = parseInt(c.paddingLeft) + parseInt(c.paddingRight);
        //nb element per row
        var nb = Math.min(parseInt((w_c - p_c) / w),n_t);

        var mod = n_t % nb;
        
        return nb - mod;
    }
