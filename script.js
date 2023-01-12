//Aici stocam static colectia de video-uri
const toate = [
    // pentru primul video
    {
        name: 'Raining',
        url: "./media/videoNr1.mp4"
    },
    // pentru al doilea video
    {
        name: 'Fotbal',
        url: "./media/videoNr2.mp4"
    },
    // al treilea video
    {
        name: 'Apus',
        url: "./media/videoNr3.mp4"
    },
    // stocare video nr. 4
    {
        name: 'Luna',
        url: "./media/videoNr4.mp4"
    },
    // video nr. 5
    {
        name: 'Galaxie',
        url: "./media/videoNr5.mp4"
    },
    // video numar 6
    {
        name: 'Rain in the forest',
        url: "./media/videoNr6.mp4"
    },
];

//se incarca pagina HTML
document.addEventListener('DOMContentLoaded', //si se construieste DOM (elementele paginii)
    initzializare); //initializam


//functie prin care se da start la video
function daPlayLaVideo(ellem) //ellem- element
{
    const titlu = ellem.currentTarget.querySelector("h3");
    console.log(ellem.currentTarget);
    const vid = ellem.currentTarget.querySelector("video");
    document.querySelectorAll(".toate .unul_singur")
        .
        forEach((compp) => {
            compp.classList
                .remove('active');//atunci cand selectam  alt video,
            //se deselecteaza celelalte
        })
        ;
    ellem.currentTarget.classList.add("active");////apoi se selecteaza pe cel pe care il dorim
    titlu_principal.textContent = titlu.textContent; //iar titlul video-ului dorit se afiseaza in prim-plan
    video_principal.src = vid.src;//si video-ul selectat la fel

}
//cream o functie de initializare
function initzializare() {
    deseneaza_Videouri();//desenare video-uri
    titlu_principal.textContent = toate[0].name;//aducem denumirea primului video in partea de "actual" (in mod default)
    video_principal.src = toate[0].url;//aducem primul video in partea de "actual" (in mod default)
    //pentru un video ales se da play
    document.querySelectorAll('.toate .unul_singur').forEach(compp => {
        compp.addEventListener
            //functia de click prin care se da porneste video atunci cand se apasa pe unul dintre ele
            ('click', daPlayLaVideo);
    })
}

//functie prin care se deseneaza / traseaza video-urile
function deseneaza_Videouri() {
    const vids = toate.map((compp, pozz) => {
        //se returneaza un nou div
        //stilul acestuia este scris in .css
        return `<div class='unul_singur ${pozz = 0 ? 'active' : ''}'>
                <video src=${compp.url}>  <!--in functie de componenta (video), 
                acesta se incarca in lista -->
                </video>
                <h3>${compp.name}</h3> <!--in functie de componenta (video), 
                numele acestuia se transmite in lista cu toate video-urile-->
            </div>`;
    });
    //se selecteaza toate video-urile
    document.querySelector(".toate").insertAdjacentHTML("beforeend",
        vids.join("")//se incarca noua lista cu video-uri
    );
}
//definim urmatoarele variabile
const actual = document.querySelector(".actual");
const principal = document.querySelector(".principal");
//identificam video-ul principal
const video_principal = actual.querySelector("video");
//identificam butonul de play si pauza
const butonPauzaPlay = actual.querySelector(".play_pauza i");
//identificam bara de progres
const baraDe_Progres_LaVideo = actual.querySelector(".bara_de_progres");
//identificam momentul curent al video-ului
const liniaDeTimpLaVideo = actual.querySelector(".linia_de_timp");
//identificam durata unui video
const durataVideo_ului = actual.querySelector(".durata_video");
//identificam timpul actual al video-ului in momentul in care se afla pe pauza
const timpul_Curent_al_Videoului = actual.querySelector(".timp_curent");
//identificam butonul (range-ul) pentru sunet
const buton_Sunet = actual.querySelector(".sunet i");
//identificam acea bara de glisare a volumului
const glisare_Volum = actual.querySelector(".left input"); let temporizator;
//identificare butonul de stergere a unui video
const buton_de_Stergere_Video = principal.querySelector(".buton_de_stergere_video");


buton_de_Stergere_Video.addEventListener("click", () => {
    const toatte = principal.querySelector(".toate .unul_singur.active");
    toatte.remove();
    // video_principal.src = toate[1].url;
    nr_total_de_video_uri = toate.length;//identificam numarul total de video-uri
    var nr_video_actual = aflaNr_LaVideo(); //aflam indicele video-ului actual la care suntem
    var nr_Adunare = nr_video_actual + 2; //crestem numarul cu doua unitati,
    //pentru ca daca numarul video-ului actual din constanta 'toate' ar fi 0 (indicele), atunci nr. video-ului actual 
    //ar fi 1, si dand skip la video mai sarim peste inca unul
    if (nr_Adunare - 1 == nr_total_de_video_uri) //daca suntem la ultimul video din lista,
        nr_Adunare = 1; //se trece la primul video
    var videoUrmator = "./media/videoNr" + nr_Adunare + ".mp4"; //identificam url-ul video-ului urmator
    video_principal.src = videoUrmator; //si inlocuim video-ul principal cu acesta atunci cand dam pe butonul de skip
    titlu.textContent = toate[nr_Adunare - 1].name;//si actualizam si titlul video-ului
});
//pentru a ascunde controalerele
ascunde_Controalere = () => {
    if (video_principal.paused) //daca video-ul principal este pe pauza
        return; //se ascund controalerele
    temporizator = setTimeout(() => { actual.classList.remove("arata_controalere"); }, 1999); //afiseaza controalerele
    //pentru aproape doua secunde
}
ascunde_Controalere(); //ascunde controalerere

actual.addEventListener("mousemove", () => {
    actual.classList.add("arata_controalere"); //cand trecem cu click-ul peste video-ul actual,
    clearTimeout(temporizator); //dupa aproape doua secunde se ascund controalerere
    ascunde_Controalere(); //se ascund controalerele
});
//selectam titlul principal al video-ului
const titlu = actual.querySelector("h2");
//declaram numarul video-ului egal cu 1 si il modificam in functiile de mai jos (skipInainte / InapoiS)
var nr_Video = 1;
video_principal.addEventListener("timeupdate", ellem => {
    let {
        currentTime, duration
    } = ellem.target;//stabilim timpul curent si durata in functie de utilizator
    let procent_Video = (currentTime / duration) * 100;//calculam procentul video-ului ca timpul actual supra durata video-ului * o suta
    baraDe_Progres_LaVideo.style.width = `${procent_Video}%`;//modificam stilul (dimensiunea) progress bar-ului in functie de procentul calculat
});
//functie prin care aflam numarul video-ului actual la care suntem (sau indicele)
function aflaNr_LaVideo() {
    for (let indiceToate in toate) {
        if (titlu_principal.textContent == toate[indiceToate].name) {
            nr_Video = indiceToate;
            return parseInt(nr_Video);//se converteste la intreg numarul video-ului si se transmite 
        }//in functiile de mai jos
    }
}
const skipLaUrmatorul = actual.querySelector(".skip_inainte i");//selectam butonul de skip inainte
skipLaUrmatorul.addEventListener("click", () => { //functie pentru butonul de skip la urmatorul video
    nr_total_de_video_uri = toate.length;//identificam numarul total de video-uri
    var nr_video_actual = aflaNr_LaVideo(); //aflam indicele video-ului actual la care suntem
    var nr_Adunare = nr_video_actual + 2; //crestem numarul cu doua unitati,
    //pentru ca daca numarul video-ului actual din constanta 'toate' ar fi 0 (indicele), atunci nr. video-ului actual 
    //ar fi 1, si dand skip la video mai sarim peste inca unul
    if (nr_Adunare - 1 == nr_total_de_video_uri) //daca suntem la ultimul video din lista,
        nr_Adunare = 1; //se trece la primul video
    var videoUrmator = "./media/videoNr" + nr_Adunare + ".mp4"; //identificam url-ul video-ului urmator
    video_principal.src = videoUrmator; //si inlocuim video-ul principal cu acesta atunci cand dam pe butonul de skip
    titlu.textContent = toate[nr_Adunare - 1].name;//si actualizam si titlul video-ului
});

const skipInapoi = actual.querySelector(".skip_inapoi i");
skipInapoi.addEventListener("click", () => { //functie pentru butonul de skip la un video anterior
    var nr_video_actual = aflaNr_LaVideo();//identificam numarul total de video-uri
    nr_total_de_video_uri = toate.length;//identificam numarul total de video-uri stocate in variabila 'toate'
    var nr_Scadere = nr_video_actual;//
    if (nr_video_actual == 0)//daca video-ului actual este primul din lista,
        nr_Scadere = nr_total_de_video_uri;//ne va redirectiona la ultimul video din lista
    var videoAnterior = "./media/videoNr" + nr_Scadere + ".mp4";//identificam url-ul video-ului anterior
    video_principal.src = videoAnterior;//si inlocuim video-ul principal cu acesta atunci cand dam pe butonul inapoi
    titlu.textContent = toate[nr_Scadere - 1].name;//si actualizam si titlul video-ului
});

//eveniment de adaugare durata totala a video-ului
video_principal.addEventListener("loadeddata", ellem => {
    durataVideo_ului.innerText = timp_LaVideo_format(ellem.target.duration);
});

//tratam evenimentul de click pentru buton de pauza si play
butonPauzaPlay.addEventListener("click", () => {
    video_principal.paused ? video_principal.play() : video_principal.pause(); //daca video-ul este pe pauza, atunci cand dam click se da play
    //si invers
});
//tratam evenimentul de play 
video_principal.addEventListener("play", () => {
    ;//cand apasam pe butonul play, se schimba 
    butonPauzaPlay.classList.replace("fa-play", "fa-pause");//aspectul acestora. Butonul de play se transforma in unul de pauza 
});

video_principal.addEventListener("pause", () => {//cand apasam pe butonul pauza, se schimba 
    butonPauzaPlay.classList.replace("fa-pause", "fa-play");;//aspectul acestora. Butonul de pauza se transforma in unul de play 
});
//tratam evenimentul de click pentru range-ul de volum
buton_Sunet.addEventListener("click", () => { //cand dam click pe butonul de sunet,
    if (!buton_Sunet.classList.contains("fa-volume-high")) {//daca butonul nu e la maxim,
        video_principal.volume = 0.5;//in mod normal volumul va fi la jumatate (in mod default)
        buton_Sunet.classList.replace("fa-volume-xmark", "fa-volume-high");//si se va schimba aspectul butonului
    } else {//altfel
        video_principal.volume = 0.0;//volumul se seteaza la 0
        buton_Sunet.classList.replace("fa-volume-high", "fa-volume-xmark");//si se schimba aspectul iconitei in una mute
    } glisare_Volum.value = video_principal.volume;//volumul video-ului principal se transmite acestei variabile
});

//se schimba aspectele in functie de ce volum setam
glisare_Volum.addEventListener("input", ellem => {
    //se identifica volumul setat de noi si se transmite video-ului principal
    video_principal.volume = ellem.target.value;
    if (ellem.target.value == 0) {//daca volumul e 0,
        buton_Sunet.classList.replace("fa-volume-high", "fa-volume-xmark");//se schimba butonul in unul de mute
    }
    else buton_Sunet.classList.replace("fa-volume-xmark", "fa-volume-high");//altfel se schimba invers
});

const timp_LaVideo_format = time => {//stabilim un format pentru secunde
    let secunddee = Math.floor(time % 60), minutttee = Math.floor(time / 60) % 60; //si pentru minute
    //floor rotunjeste la un numar intreg mai mic sau egal cu numarul in cauza
    secunddee = secunddee < 10 ? `0${secunddee}` : secunddee; minutttee = minutttee < 10 ? `0${minutttee}` : minutttee;
    return `${minutttee}:${secunddee}`;//returnam un format pentru minute si secunde (timp la video), de ex. 21:43
}
//se update-aza timpul in timp ce se duce si timpul la video
video_principal.addEventListener("timeupdate", ell => {
    let { currentTime, duration } = ell.target;//in functie de ce timp setam
    let procentul_Video_ului = (currentTime / duration) * 100;//se calculeaza procentul, care se calculeaza ca timpul actual supra durata vide-ului inmultit cu 100
    baraDe_Progres_LaVideo.style.width = `${procentul_Video_ului}%`;//se actualizeaza bara
    timpul_Curent_al_Videoului.innerText = timp_LaVideo_format(currentTime);//se actualizeaza textul cu timpul actual
});
//cand dam click pe linia de timp si vrem sa sarim la un anumit moment din video
liniaDeTimpLaVideo.addEventListener("click", ellem => {
    let dimensiuneLinieDeTimp = liniaDeTimpLaVideo.clientWidth;//se actualizeaza la momentul in care vrem noi
    baraDe_Progres_LaVideo.style.width = `${ellem.offsetX}px`;//se modifica dimensiunea barei
    video_principal.currentTime = (ellem.offsetX / dimensiuneLinieDeTimp) * video_principal.duration;//se modifica timpul la video principal
    timpul_Curent_al_Videoului.innerText = timp_LaVideo_format(video_principal.currentTime);//si textul cu timpul actual
});

video_principal.onended = function () {//cand video-ul actual se sfarseste
    nr_total_de_video_uri = toate.length;//aflam numarul tuturor video-urilor stocate
    var nr_video_actual = aflaNr_LaVideo();//aflam numarul la video actual
    var nr_Adunare = nr_video_actual + 2;//se trece la video-ul urmator
    if (nr_Adunare - 1 == nr_total_de_video_uri)//daca video-ul actual de ultimul,
        nr_Adunare = 1;//se va trece la primul video
    var videoUrmator = "./media/videoNr" + nr_Adunare + ".mp4";//se identifica url-ul video-ului urmator
    video_principal.src = videoUrmator;//se modifica video-ul
    titlu.textContent = toate[nr_Adunare - 1].name;//se actualizeaza titlul la video
}
//functie de fullscreen
const peTot_Ecranul = actual.querySelector(".pe_tot_ecranul i");//identificam iconul (butonul) pentru fullscreen
peTot_Ecranul.addEventListener("click", () => {
    actual.classList.toggle("pe_tot_ecranul");
    //daca video-ul e deja pe tot ecranul
    if (document.fullscreenElement) {
        peTot_Ecranul.classList.replace("fa-compress", "fa-expand"); document.exitFullscreen();//modificam aspectul butonului si iesim din modul fullscreen
    }//altfel
    peTot_Ecranul.classList.replace("fa-expand", "fa-compress");//modificam aspectul butonului in unul de minimizare
    actual.requestFullscreen();//si trecem pe modul fullscreen 
});

