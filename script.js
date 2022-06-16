
let musicas = [
    {titulo: 'Anywhere', artista: 'Ikson', src:'Ikson-Anywhere.mp3', img:'music1.png'},
    {titulo: 'The Mini Vandals', artista: 'Ella Vater', src: 'Ella Vater - The Mini Vandals.mp3', img:'samba.jpg'},
    {titulo: 'A Brand New Start', artista: 'TrackTribe', src:'A Brand New Start - TrackTribe.mp3', img:'piano.jpg'},
    {titulo: 'The Rock Mountain', artista: 'John Black', src:'Rock.mp3', img:'rock.jpg'},
    {titulo: 'Love', artista: 'The Blue Bird', src:'music2.mp3', img:'music2.png'}
];

let musica = document.querySelector('audio');

let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.nome');
let nomeArtista = document.querySelector('.artista');

renderizarMusica(indexMusica);

document.querySelector('.bx-pause').style.display = 'none';


// Eventos
document.querySelector('.bx-play').addEventListener('click', tocarMusica);
document.querySelector('.bx-pause').addEventListener('click', pausarMusica);
document.querySelector('.bx-skip-previous').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = musicas.length;
    }
    renderizarMusica(indexMusica);
    musica.play();

});

document.querySelector('.bx-skip-next').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > musicas.length){
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
    musica.play();
});

musica.addEventListener('timeupdate', tempoMusica);
window.onload = duration;


// Funções
function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = converterSegundos(Math.floor(musica.duration));
    });
}

function tocarMusica() {
    musica.play();
    document.querySelector('.bx-pause').style.display = 'block';
    document.querySelector('.bx-play').style.display = 'none';    
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.bx-pause').style.display = 'none';
    document.querySelector('.bx-play').style.display = 'block';
}

function tempoMusica(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';   
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = converterSegundos(Math.floor(musica.currentTime));
}

function converterSegundos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;
    }
    return campoMinutos + ':' +campoSegundos;
}

function duration(){
    duracaoMusica.textContent = converterSegundos(Math.floor(musica.duration));
}
