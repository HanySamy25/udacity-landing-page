/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const navList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
const sectionTitle = document.querySelectorAll("section h2");
const fragment = document.createDocumentFragment();  // uses a DocumentFragment to append once to navList
const goToTop = document.getElementById('top');
const barsBtn = document.getElementById('bars');
let scrolling; // to check scrolling



/**
 * End Global Variables
 * 
*/



/**
 * Begin Main Functions
 * 
*/

// build the nav
// func to generate dynamic menu items based on sections
function generateMenuItems() {

    // loop throuh each sections and create anchor within li with attrs
    for (const section of sections) {

        // create li item
        let li = document.createElement('li');

        // add anchor tag with attrs to th li item
        li.innerHTML = `<a href="javascript:void(0)" data-section="${section.id}" class="menu__link">${section.dataset.nav}</a>`;

        // append li item to the docunet fragment
        fragment.appendChild(li);

    }

    // append all li items once to the navbar_list
    navList.append(fragment);

}



// func to Add class 'active' to section when near top of viewport

function activeSection() {
    sections.forEach(section => {
        if (section.getBoundingClientRect().top > -300 && section.getBoundingClientRect().top <= 500) {

            // add active class to the section
            section.classList.add('active_section');

            // remove class active_li from all anchor in navbar_list items
            alinks.forEach(a => a.classList.remove("active_li"));

            // add class active_li to clicked anchor in navbar_list items
            document.querySelectorAll(`a[data-section="${section.id}"]`)[0].classList.add('active_li');

            // remove class active_section_title from the section title
            sectionTitle.forEach(h => h.classList.remove("active_section_title"));

            // add class active_section_title to the section title whos its anchor was clicked
            document.querySelector(`#${section.id} h2`).classList.add('active_section_title');


        } else {
            section.classList.remove('active_section');


        }
    })
}


// func to show hide button go to top on window scroll
function showHideButtonTop() {
    document.body.scrollTop > 900 ? goToTop.style.display = 'block' : goToTop.style.display = 'none';
}



/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 
// call function generateMenuItems on page load
generateMenuItems();

// define anchorlinks variable from the dynamiclly generated  menu items
const alinks = document.querySelectorAll("a.menu__link")



// Scroll to section on link click
navList.addEventListener("click", (e) => {
    e.preventDefault();

    // get sectionid from clicked link and navigate to the section by its id
    const sectionid = e.target.getAttribute('data-section');
    document.getElementById(sectionid).scrollIntoView({ behavior: 'smooth' });

    // remove class active from all links 
    alinks.forEach(a => a.classList.remove('active_li'));

    // add class active_li to the clicked link 
    e.target.classList.add('active_li');

});


/* 
* Start responsive menu
*/



// add event click to button bars to open & close navbar menu
barsBtn.addEventListener('click', () => {

    // toggle show & hide button bars
    barsBtn.classList.toggle('show');

    // toggle class to show and hide navbar menu
    navList.classList.toggle('open');
});

// close menu links when click on the page
document.addEventListener('click', (e) => {

    if (e.target != barsBtn && navList.classList.contains('open')) {
        barsBtn.classList.remove('show');
        navList.classList.remove('open');
    }


});

/* 
* End responsive menu
*/









/*** 
* Start scrolling behavior
*/



// Hide fixed navigation bar while not scrolling
setTimeout(() => navList.style.display = 'none', 1500);

// do some actions on window scroll
window.addEventListener("scroll", () => {

    // call func showHide button go to top
    showHideButtonTop();

    // Show fixed navigation bar while scrolling when media query not present
    if (window.getComputedStyle(barsBtn).display == "none") {
        navList.style.display = 'block';

    }

    // clearing past scrolling varivale
    window.clearTimeout(scrolling);

    // disable navbar after scrolloing finished and assign timeout id it to scrolling variable
    scrolling = setTimeout(() => navList.style.display = 'none', 1000);

    // remove active from all menu links on scrollTop 0
    if (document.body.scrollTop === 0) {
        alinks.forEach(a => a.classList.remove("active_li"));
        return;
    }

    // call func to set section active when scrolling and section in viewport
    activeSection();


});

// show navbar on mouseover on top of the page
document.addEventListener('mouseover', (e) => {
    if (window.getComputedStyle(barsBtn).display == "none" && e.clientY < 100) {
        navList.style.display = 'block';
    } else {
        navList.style.display = 'none';
    }
})


// collaps section on click
document.querySelector('main').addEventListener('click', (e) => {

    const target = e.target
    const targetSection = target.parentNode.parentNode.id;
    if (target.classList.contains('section_collapse')) {
        target.nextElementSibling.classList.toggle('hide');
        document.querySelector(`#${targetSection}`).classList.toggle('collapse');
        console.log(target.nextElementSibling);
    }


});

// add event to button to go to top
goToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
});


// make window scrolle smooth
window.scrollTo({
    behavior: "smooth"
});

/***
* End scrolling behavior
*/