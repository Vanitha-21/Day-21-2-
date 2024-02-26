const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    const slideshow = document.getElementById('slideshow');
    const modal = document.querySelector('.modal');
    

    
    async function start() {
        try {
          const response = await fetch("https://dog.ceo/api/breeds/list/all")
          const data = await response.json();
          createBreedList(data.message);
        } catch (e) {
          console.log("There was a problem fetching the breed list.")
        }
        
    }
    
    start()
    
    function createBreedList(breedList) {
        const dogBreed = document.getElementById("breed");
        dogBreed.innerHTML = `
            <select onchange="loadByBreed(this.value)">
                <option>Choose a dog breed</option>
                ${Object.keys(breedList).map(function(breed) {
                    return `<option>${breed}</option>`
                }).join('')};
            </select>
        `
    }
    
    async function loadByBreed(breed) {
        if (breed !== "Choose a dog breed") {
          const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
          const data = await response.json();
          openModal();
          createSlideshow(data.message);
        }
      }

      function openModal() {
        if(modal.matches('.open')) {
            console.info('Modal already open!');
            return;
        }
        modal.classList.add('open');
    }

    function closeModal() {
        modal.classList.remove('open');

    // Event listeners clean up when we close the modal:
        next.removeEventListener('click', nextImg);   
        prev.removeEventListener('click', prevImg);

    }

    function handleClickOutside(e) {
        if(e.target === e.currentTarget) closeModal();  /* if u r clicking inside the modal and not inside innerModal, meaning, the image itself? closeModal */ 

    }
    
    
    function createSlideshow(image) {
        let currentPosition = 0;
        const slideShow = document.querySelector('.slideshow');
        if (image.length > 1) {
            slideShow.innerHTML = `
                <img src="${image[0]}" class="slide"></img>
            `
            currentPosition += 1;
        } else {
            currentPosition = 0;
        }

        function nextImage() {
            slideshow.insertAdjacentHTML("beforeend", `<img src="${image[currentPosition]}" class="slide"></img>`);
            document.querySelector(".slide").remove()
            currentPosition++;
            if (currentPosition + 1 === image.length) {
                currentPosition = 0;
              } else {
                currentPosition++;
              }

        }

        function prevImage() {
            slideshow.insertAdjacentHTML("beforeend", `<img src="${image[currentPosition]}" class="slide"></img>`);
            document.querySelector(".slide").remove();
            currentPosition--;
            if (currentPosition - 1 < 0) {
                currentPosition = image.length - 1;
              } else {
                currentPosition--
              }

        }


        next.addEventListener('click', nextImage);
        prev.addEventListener('click', prevImage);
        modal.addEventListener('click', handleClickOutside);
    }


    
    
