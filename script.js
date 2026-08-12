let currentSong = null;
let currentSongIndex = -1;
let currentArtist = null;
let currentPlaylist = [];

let shuffleEnabled = false;
let repeatEnabled = false;


window.openArtist = function (artistName) {

    window.location.href =
        "artist.html?artist=" +
        encodeURIComponent(artistName);

};


/* =========================
   ARTIST PAGE
========================= */

function loadArtistPage() {

    const params =
        new URLSearchParams(window.location.search);

    const artistName =
        params.get("artist");

    if (!artistName) {
        return;
    }

    const artist =
        artists[artistName];

    if (!artist) {
        return;
    }


    currentArtist = artist;
    currentPlaylist = artist.songs;


    document.getElementById("artistName").textContent =
        artist.name;


    const image =
        document.getElementById("artistImage");

    image.src =
        artist.image;

    image.alt =
        artist.name;


    const songsList =
        document.getElementById("songsList");

    const songsCount =
        document.getElementById("songsCount");


    songsCount.textContent =
        artist.songs.length +
        (
            artist.songs.length === 1
                ? " song"
                : " songs"
        );


    songsList.innerHTML = "";


    artist.songs.forEach(function (song, index) {

        const songElement =
            document.createElement("div");

        songElement.className =
            "song-row";


        songElement.addEventListener(
            "click",
            function () {

                playSong(
                    song,
                    index
                );

            }
        );


        songElement.innerHTML =

            '<span class="song-number">' +
                String(index + 1).padStart(2, "0") +
            '</span>' +

            '<div class="song-title">' +
                '<strong>' +
                    song.title +
                '</strong>' +
            '</div>' +

            '<div class="song-album">' +
                song.album +
            '</div>' +

            '<div class="song-duration">' +
                song.duration +
            '</div>';


        songsList.appendChild(
            songElement
        );

    });

}


/* =========================
   ALBUMS PAGE
========================= */

function loadAlbumsPage() {

    const albums = {};


    Object.values(artists).forEach(function (artist) {

        artist.songs.forEach(function (song) {

            if (!song.album) {
                return;
            }


            const key =
                artist.name + " — " + song.album;


            if (!albums[key]) {

                albums[key] = {

                    name: song.album,

                    artist: artist.name,

                    image:
                        song.cover ||
                        artist.image,

                    songs: []

                };

            }


            albums[key].songs.push(song);

        });

    });


    const albumsGrid =
        document.getElementById("albumsGrid");

    const albumsCount =
        document.getElementById("albumsCount");


    if (!albumsGrid) {
        return;
    }


    const albumsArray =
        Object.values(albums);


    albumsCount.textContent =
        albumsArray.length +
        (
            albumsArray.length === 1
                ? " album"
                : " albums"
        );


    albumsGrid.innerHTML = "";


    albumsArray.forEach(function (album) {

        const albumCard =
            document.createElement("div");


        albumCard.className =
            "album-card";


        albumCard.addEventListener(
            "click",
            function () {

                window.location.href =
                    "album.html?artist=" +
                    encodeURIComponent(album.artist) +
                    "&album=" +
                    encodeURIComponent(album.name);

            }
        );


        albumCard.innerHTML =

            '<div class="album-image">' +

                '<img src="' +
                    album.image +
                    '" alt="' +
                    album.name +
                '">' +

            '</div>' +

            '<div class="artist-info">' +

                '<h3>' +
                    album.name +
                '</h3>' +

                '<p>' +
                    album.artist +
                '</p>' +

            '</div>';


        albumsGrid.appendChild(
            albumCard
        );

    });

}


/* =========================
   ALBUM PAGE
========================= */

function loadAlbumPage() {

    const params =
        new URLSearchParams(window.location.search);


    const artistName =
        params.get("artist");


    const albumName =
        params.get("album");


    if (!artistName || !albumName) {
        return;
    }


    const artist =
        artists[artistName];


    if (!artist) {
        return;
    }


    const albumSongs =
        artist.songs.filter(function (song) {

            return song.album === albumName;

        });


    if (albumSongs.length === 0) {
        return;
    }


    currentArtist =
        artist;

    currentPlaylist =
        albumSongs;


    const albumImage =
        document.getElementById("albumImage");

    const albumTitle =
        document.getElementById("albumName");

    const albumArtist =
        document.getElementById("albumArtist");

    const songsList =
        document.getElementById("albumSongsList");

    const songsCount =
        document.getElementById("albumSongsCount");


    albumTitle.textContent =
        albumName;


    albumArtist.textContent =
        artist.name;


    albumImage.src =
        albumSongs[0].cover ||
        artist.image;


    albumImage.alt =
        albumName;


    songsCount.textContent =
        albumSongs.length +
        (
            albumSongs.length === 1
                ? " song"
                : " songs"
        );


    songsList.innerHTML = "";


    albumSongs.forEach(function (song, index) {

        const songElement =
            document.createElement("div");


        songElement.className =
            "song-row";


        songElement.addEventListener(
            "click",
            function () {

                playSong(
                    song,
                    index
                );

            }
        );


        songElement.innerHTML =

            '<span class="song-number">' +

                String(index + 1)
                    .padStart(2, "0") +

            '</span>' +

            '<div class="song-title">' +

                '<strong>' +
                    song.title +
                '</strong>' +

            '</div>' +

            '<div class="song-album">' +

                song.album +

            '</div>' +

            '<div class="song-duration">' +

                song.duration +

            '</div>';


        songsList.appendChild(
            songElement
        );

    });

}


/* =========================
   LOAD CURRENT PAGE
========================= */

if (
    window.location.pathname.endsWith(
        "artist.html"
    )
) {

    loadArtistPage();

}


if (
    window.location.pathname.endsWith(
        "albums.html"
    )
) {

    loadAlbumsPage();

}


if (
    window.location.pathname.endsWith(
        "album.html"
    )
) {

    loadAlbumPage();

}


/* =========================
   PLAYER ELEMENTS
========================= */

const audioPlayer =
    document.getElementById("audioPlayer");

const playerCover =
    document.getElementById("playerCover");

const playerTitle =
    document.getElementById("playerTitle");

const playerArtist =
    document.getElementById("playerArtist");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");

const playButton =
    document.getElementById("playButton");

const volumeBar =
    document.getElementById("volumeBar");

const progressBar =
    document.getElementById("progressBar");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const shuffleButton =
    document.getElementById("shuffleButton");

const repeatButton =
    document.getElementById("repeatButton");


/* =========================
   PLAYER
========================= */

if (audioPlayer) {

    audioPlayer.volume = 1;

}


if (volumeBar && audioPlayer) {

    volumeBar.addEventListener(
        "input",
        function () {

            audioPlayer.volume =
                volumeBar.value;

        }
    );

}


/* =========================
   PLAY SONG
========================= */

function playSong(song, index) {

    if (!audioPlayer) {
        return;
    }


    if (!song.audio) {

        console.log(
            "У этой песни нет аудиофайла"
        );

        return;

    }


    currentSong =
        song;

    currentSongIndex =
        index;


    document
        .querySelectorAll(".song-row")
        .forEach(function (row) {

            row.classList.remove(
                "playing"
            );

        });


    const songRows =
        document.querySelectorAll(
            ".song-row"
        );


    if (songRows[index]) {

        songRows[index].classList.add(
            "playing"
        );

    }


    audioPlayer.src =
        song.audio;


    playerTitle.textContent =
        song.title;


    if (currentArtist) {

        playerArtist.textContent =
            currentArtist.name;

    }


    if (song.cover) {

        playerCover.src =
            song.cover;

    }


    audioPlayer.currentTime =
        0;


    audioPlayer.play();


    playButton.textContent =
        "❚❚";


    progressBar.value =
        0;

}


/* =========================
   PLAY / PAUSE
========================= */

if (playButton) {

    playButton.addEventListener(
        "click",
        function () {

            if (!currentSong) {
                return;
            }


            if (audioPlayer.paused) {

                audioPlayer.play();

                playButton.textContent =
                    "❚❚";

            } else {

                audioPlayer.pause();

                playButton.textContent =
                    "▶";

            }

        }
    );

}


/* =========================
   TIME UPDATE
========================= */

if (audioPlayer) {

    audioPlayer.addEventListener(
        "timeupdate",
        function () {

            if (!audioPlayer.duration) {
                return;
            }


            const progress =
                (
                    audioPlayer.currentTime /
                    audioPlayer.duration
                ) * 100;


            if (progressBar) {

                progressBar.value =
                    progress;

            }


            if (currentTime) {

                currentTime.textContent =
                    formatTime(
                        audioPlayer.currentTime
                    );

            }

        }
    );


    audioPlayer.addEventListener(
        "loadedmetadata",
        function () {

            if (duration) {

                duration.textContent =
                    formatTime(
                        audioPlayer.duration
                    );

            }

        }
    );

}


/* =========================
   PROGRESS BAR
========================= */

if (progressBar && audioPlayer) {

    progressBar.addEventListener(
        "input",
        function () {

            if (!audioPlayer.duration) {
                return;
            }


            audioPlayer.currentTime =
                (
                    progressBar.value /
                    100
                ) *
                audioPlayer.duration;

        }
    );

}


/* =========================
   FORMAT TIME
========================= */

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);


    return (
        minutes +
        ":" +
        String(secs).padStart(2, "0")
    );

}


/* =========================
   NEXT
========================= */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        function () {

            if (!currentPlaylist.length) {
                return;
            }


            let nextIndex;


            if (shuffleEnabled) {

                if (
                    currentPlaylist.length === 1
                ) {

                    nextIndex = 0;

                } else {

                    do {

                        nextIndex =
                            Math.floor(
                                Math.random() *
                                currentPlaylist.length
                            );

                    } while (
                        nextIndex ===
                        currentSongIndex
                    );

                }

            } else {

                nextIndex =
                    currentSongIndex + 1;


                if (
                    nextIndex >=
                    currentPlaylist.length
                ) {

                    if (repeatEnabled) {

                        nextIndex = 0;

                    } else {

                        return;

                    }

                }

            }


            playSong(
                currentPlaylist[nextIndex],
                nextIndex
            );

        }
    );

}


/* =========================
   PREVIOUS
========================= */

if (previousButton) {

    previousButton.addEventListener(
        "click",
        function () {

            if (!currentPlaylist.length) {
                return;
            }


            const previousIndex =
                currentSongIndex - 1;


            if (previousIndex < 0) {
                return;
            }


            playSong(
                currentPlaylist[previousIndex],
                previousIndex
            );

        }
    );

}


/* =========================
   SONG ENDED
========================= */

if (audioPlayer) {

    audioPlayer.addEventListener(
        "ended",
        function () {

            if (!currentPlaylist.length) {
                return;
            }


            let nextIndex;


            /* REPEAT + SHUFFLE */

            if (
                repeatEnabled &&
                shuffleEnabled
            ) {

                if (
                    currentPlaylist.length === 1
                ) {

                    nextIndex = 0;

                } else {

                    do {

                        nextIndex =
                            Math.floor(
                                Math.random() *
                                currentPlaylist.length
                            );

                    } while (
                        nextIndex ===
                        currentSongIndex
                    );

                }

            }


            /* REPEAT */

            else if (repeatEnabled) {

                nextIndex =
                    currentSongIndex + 1;


                if (
                    nextIndex >=
                    currentPlaylist.length
                ) {

                    nextIndex = 0;

                }

            }


            /* SHUFFLE */

            else if (shuffleEnabled) {

                if (
                    currentPlaylist.length === 1
                ) {

                    nextIndex = 0;

                } else {

                    do {

                        nextIndex =
                            Math.floor(
                                Math.random() *
                                currentPlaylist.length
                            );

                    } while (
                        nextIndex ===
                        currentSongIndex
                    );

                }

            }


            /* NORMAL */

            else {

                nextIndex =
                    currentSongIndex + 1;


                if (
                    nextIndex >=
                    currentPlaylist.length
                ) {

                    playButton.textContent =
                        "▶";

                    return;

                }

            }


            playSong(
                currentPlaylist[nextIndex],
                nextIndex
            );

        }
    );

}


/* =========================
   SHUFFLE
========================= */

if (shuffleButton) {

    shuffleButton.addEventListener(
        "click",
        function () {

            shuffleEnabled =
                !shuffleEnabled;


            shuffleButton.classList.toggle(
                "active",
                shuffleEnabled
            );


            console.log(
                "Shuffle:",
                shuffleEnabled
            );

        }
    );

}


/* =========================
   REPEAT
========================= */

if (repeatButton) {

    repeatButton.addEventListener(
        "click",
        function () {

            repeatEnabled =
                !repeatEnabled;


            repeatButton.classList.toggle(
                "active",
                repeatEnabled
            );


            console.log(
                "Repeat:",
                repeatEnabled
            );

        }
    );

}

