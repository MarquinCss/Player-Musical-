let musicas = [
    {titulo:'Meninos e meninas', artista:'Jão', source:'mus/jao.mp3', img:'img/Jão.jpg'},
    {titulo:'Marry On A Cross', artista:'Ghost', source:'mus/marry.mp3', img:'img/Marry.jpg'},
    {titulo:'Class Fight', artista:'Melaine Martinez', source:'mus/mel.mp3', img:'img/Mel.jpg'},
	 {titulo:'Exagerado', artista:'Cazuza', source:'mus/Caz.mp3', img:'img/Caz.jpg'},
	  {titulo:'Drugs', artista:'Upsahl', source:'mus/drugs.mp3', img:'img/Drugs.jpg'},
	  	  {titulo:'Erva Venenosa', artista:'Rita Lee', source:'mus/rita.mp3', img:'img/Rita.jpg'},
		  	  	  {titulo:'Bloody Marry', artista:'Lady Gaga', source:'mus/gaga.mp3', img:'img/Gaga.jpg'},
				  {titulo:'House of memories', artista:'Panic At Disco', source:'mus/disco.mp3', img:'img/Disco.jpg'},
				  {titulo:'Believer', artista:'Imagine Dragons', source:'mus/believer.mp3', img:'img/Believer.jpg'},
				  {titulo:'Runaway', artista:'Aurora', source:'mus/aurora.mp3', img:'img/Aurora.jpg'},
			  {titulo:'Jenny - I Wanna Ruin Our Friendship', artista:'Studio Killers', source:'mus/jenny.mp3', img:'img/Jenny.jpg'},
			   {titulo:'Teen Idle', artista:'Marina And The Diamonds', source:'mus/teen.mp3', img:'img/Marina.jpg'},
];

// INICIO
let musica = document.querySelector('audio');
let musicaIndex = 0;

let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');
let imagem = document.querySelector('img');
let tempoDecorrido = document.querySelector('.tempo .inicio');
let duracaoMusica = document.querySelector('.tempo .fim');

nomeMusica.textContent = musicas[musicaIndex].titulo;
nomeArtista.textContent = musicas[musicaIndex].artista;
imagem.setAttribute('src', musicas[musicaIndex].img);
duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

// EVENTOS
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    musicaIndex--; 
    if (musicaIndex < 0){
        musicaIndex = 2;
    }
    renderizarMusica(musicaIndex);
});

document.querySelector('.proximo').addEventListener('click', () => {
    musicaIndex++;
    if (musicaIndex > 12){
        musicaIndex = 0;
    }
    renderizarMusica(musicaIndex);
});

// FUNÇÕES

function renderizarMusica(musicaIndex){
    musica.setAttribute('src', musicas[musicaIndex].source);

    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[musicaIndex].titulo;
        nomeArtista.textContent = musicas[musicaIndex].artista;
        imagem.src = musicas[musicaIndex].img;
    
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });

    document.body.append(musica);
}

function tocarMusica(){
    musica.play();
    document.querySelector('.botao-play').style.display = 'none';
    document.querySelector('.botao-pause').style.display = 'block';
}

function pausarMusica(){
    musica.pause();
    document.querySelector('.botao-play').style.display = 'block';
    document.querySelector('.botao-pause').style.display = 'none';
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;

    if (campoSegundos < 10){
        campoSegundos = '0'+ campoSegundos;
    }
    return `${campoMinutos}:${campoSegundos}`;
}

function atualizarBarra(){
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration)*100) + '%';
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}