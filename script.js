let currentIndex = 2;
const slides = document.querySelectorAll(".Canvas div");
const thumbs = document.querySelectorAll(".icon");
const thumbWrapper = document.querySelector(".icon-wrapper");
const thumbWidth = 58; 
const clickSound = document.getElementById('keyboard_1');
const clickDown = document.getElementById('keyboard_2');
const clickUp = document.getElementById('keyboard_3');
const clicklr = document.getElementById('lrbutton');
let keyPressed = false;


document.querySelector('.lButton').addEventListener('click', () => moveSlide(-1));
document.querySelector('.rButton').addEventListener('click', () => moveSlide(1));


thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => jumpToSlide(index));
});

function updateCarousel() {
    slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentIndex);
    });
    thumbs.forEach((thumb, index) => {
        thumb.classList.toggle("active", index === currentIndex);
    });
    centerActiveThumb();
}


function handlePress(slide) {
    clickDown.currentTime = 0;
    clickDown.play();
    const img = slide.querySelector('img');
    img.src = img.src.replace('.PNG', '_pressed.PNG');
    slide.addEventListener('mouseup', () => {
        clickUp.currentTime = 0;
        clickUp.play();
        img.src = img.src.replace('_pressed.PNG', '.PNG');
    }, { once: true });
}

slides.forEach(slide => {
    slide.addEventListener('mousedown', () => handlePress(slide));
});

function handleButtonPress() {
    clickDown.currentTime = 0;
    clickDown.play();
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        img.src = img.src.replace('.PNG', '_pressed.PNG');
    });

}

function handleButtonRelease() {
    clickUp.currentTime = 0;
    clickUp.play();
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        img.src = img.src.replace('_pressed.PNG', '.PNG');
    });
}

document.getElementById('changeContentBtn').addEventListener('mousedown', handleButtonPress);
document.getElementById('changeContentBtn').addEventListener('mouseup', handleButtonRelease);


function moveSlide(step) {
    clicklr.currentTime = 0;
    clicklr.play();
    currentIndex = (currentIndex + step + slides.length) % slides.length;
    updateCarousel();
}

function jumpToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function moveThumbs(step) {
    const thumbCount = thumbs.length;
    currentIndex = (currentIndex + step + thumbCount) % thumbCount;
    updateCarousel();
}

function centerActiveThumb() {
    const offset = -(currentIndex - 2) * thumbWidth;
    const maxOffset = -(thumbs.length - 3) * thumbWidth;
    thumbWrapper.style.transform = `translateX(${offset % (thumbWidth * thumbs.length)}px)`;
}

document.addEventListener('keydown', (event) => {
    if ((event.code === 'Space' || event.code === 'Enter') && !keyPressed) {
        keyPressed = true;
        document.getElementById('changeContentBtn').classList.add('active');
        handleButtonPress();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space' || event.code === 'Enter') {
        keyPressed = false;
        document.getElementById('changeContentBtn').classList.remove('active');
        handleButtonRelease();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft') {
        moveSlide(-1);
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowRight') {
        moveSlide(1);
    }
});





