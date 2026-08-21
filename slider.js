

// portadas escritora relatos

window.addEventListener('load', function(){
	new Glider(document.querySelector('.carousel__lista'), {
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: '.carousel__indicadores',
		arrows: {
			prev: '.carousel__anterior',
			next: '.carousel__siguiente'
		},
		responsive: [
			{
			  // screens greater than >= 775px
			  breakpoint: 450,
			  settings: {
				// Set to `auto` and provide item width to adjust to viewport
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},{
			  // screens greater than >= 1024px
			  breakpoint: 800,
			  settings: {
				slidesToShow: 4,
				slidesToScroll: 4
			  }
			}
		]
	});
});


// galeria  filtros blog

var filterButtons = document.querySelectorAll(".filter");
var imgBoxes = document.querySelectorAll(".img-box-3");

// Agregar un evento de click a cada botón de filtro
filterButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    var category = button.getAttribute("data-category");
    filterImages(category);
  });
});

function filterImages(category) {
  imgBoxes.forEach(function(imgBox) {
    if (imgBox.getAttribute("data-category") === category || category === "all") {
      imgBox.style.display = "block";
    } else {
      imgBox.style.display = "none";
    }
  });
}

