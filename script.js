$(document).ready(function () {
	var current_step, next_step, previous_step;
	var opacity;
	var current = 1;
	var steps = $("fieldset").length;

	setProgressBar(current);
	$(".next-step").click(function () {
		current_step = $(this).parent().parent();
		next_step = $(this).parent().parent().next();

		$("#progressbar li").eq($("fieldset")
		.index(next_step)).addClass("active");

			next_step.show();
				current_step.animate({ opacity: 0 }, {
					step: function (now) {
						opacity = 1 - now;

						current_step.css({
							'display': 'none',
							'position': 'relative'
						});
						next_step.css({ 'opacity': opacity });
					},
					duration: 500
				});
				setProgressBar(++current);


	});

	$(".previous-step").click(function () {

		current_step = $(this).parent().parent();
		previous_step = $(this).parent().parent().prev();

		$("#progressbar li").eq($("fieldset")
		.index(current_step)).removeClass("active");

		previous_step.show();

		current_step.animate({ opacity: 0 }, {
			step: function (now) {
				opacity = 1 - now;

				current_step.css({
					'display': 'none',
					'position': 'relative'
				});
				previous_step.css({ 'opacity': opacity });
			},
			duration: 500
		});
		setProgressBar(--current);
	});

	function setProgressBar(currentStep) {
		var percent = parseFloat(100 / steps) * current;
		percent = percent.toFixed();
		$(".progress-bar")
			.css("width", percent + "%")
	}
});

// ** Jquery (end)

// *** Technologies tags [START] ***
const techInput = document.getElementById("techs");
const techTags = document.getElementById("tech-tags");
const inputtechTags = document.getElementById("input-tech-tags"); // hidden message
let summary_web_techs = document.getElementById('summary_web_techs');
let tagValues = [];
// Function to update summary tags
function updateSummaryTags() {
    // Clear previous summary
    summary_web_techs.innerHTML = "";

    // Append new summary tags
    tagValues.forEach(tagName => {
        const summary_tag = document.createElement("span");
        summary_tag.classList.add("tech-tag", "m-2", "px-2","py-1","rounded-pill", "fw-500");
		summary_tag.style.backgroundColor = "aliceblue";
        summary_tag.innerText = tagName.replace("/", "");
        summary_web_techs.appendChild(summary_tag);
    });
}

techInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        const newtech = techInput.value.trim();
        if (newtech) {
            const tag = document.createElement("span");
            tag.classList.add("tech-tag", "m-2", "px-2", "rounded-pill", "fw-500");
            tag.style.backgroundColor = "aliceblue";
            tag.innerText = newtech;

            // Create and append close icon
            const closeIcon = document.createElement("span");
            closeIcon.classList.add("tech-tag-close", "fw-bold", "ms-2");
            closeIcon.innerHTML = "&times;"; // Alternatively use Font Awesome for a cross icon
            tag.appendChild(closeIcon);

            // insert value in arr.
            tagValues.push(newtech);
            inputtechTags.setAttribute("value", tagValues.join("/"));

            closeIcon.addEventListener("click", function () {
                // Remove the tech from the tagValues array
                const index = tagValues.indexOf(newtech);
                if (index > -1) {
                    tagValues.splice(index, 1);
                    inputtechTags.setAttribute("value", tagValues.join("/"));
                    tag.remove();
                    // Update summary tags after removing the element
                    updateSummaryTags();
                }
            });

            techTags.appendChild(tag);
            techInput.value = "";

            // Update summary tags after adding a new tech
            updateSummaryTags();
        }
    }
});

// *** Technology Tag [END] ***


// *** Handle Source Code Upload [START] ***
let src_code = document.querySelector('#srcCode')
let srcCodeName = document.querySelector("#srcCodeName")    // this is the green text which is displayed when we select a file

src_code.addEventListener('change', function () {
	let mb = 1048576
	let file = src_code.files[0]
	if (file.size > 20 * mb) {
		// alert("please keep file size under 20MB. Current File Size " + Math.ceil(file.size / mb) + "MB")
		src_code.value = "";
		srcCodeName.innerText = "";
	}
	else if (file.type != "application/x-zip-compressed") {
		alert('File type not Supported')
		src_code.value = "";
		srcCodeName.innerText = "";
	}
	else {
		srcCodeName.innerText = file.name;
	}
});
// *** Handle Source Code Upload [END] ***

// *** Handle Documentation Upload [START] ***
let documentation = document.querySelector('#documentation')
let documentationName = document.querySelector("#documentationName")    // this is the green text which is displayed when we select a file

documentation.addEventListener('input', function () {
	let mb = 1048576;
	let file = documentation.files[0];
	let fileType = file.name.split('.').pop().toLowerCase();
	if (file.size > 5 * mb) {
		alert("Please keep file size under 5MB. Current File Size: " + Math.ceil(file.size / mb) + "MB");
		documentation.value = "";
		documentationName.innerText = "";
	}
	else if (fileType !== "doc" && fileType !== "docx" && fileType !== "pdf") {
		alert('File type not supported. Please upload a Word document (.doc/.docx) or a PDF file.');
		documentation.value = "";
		documentationName.innerText = "";
	}
	else {
		documentationName.innerText = file.name;
	}
});
// *** Handle Documentation Upload [END] ***


// *** Step 4: website_not_hosted Card JS [START] ***
let website_url = document.getElementById('website_url');
let website_anchor = document.getElementById('websiteURL_anchor');
website_url.addEventListener("change", () => {
	let url = website_url.value.trim();

	if(url != ''){
		website_anchor.textContent = url;
		website_anchor.setAttribute("href", url);

		document.getElementById('website_already_hosted').classList.remove('d-none');
		document.getElementById('website_not_hosted').classList.add('d-none');
	}
	else{
		document.getElementById('website_already_hosted').classList.add('d-none');
		document.getElementById('website_not_hosted').classList.remove('d-none');
	}

});
// *** website_not_hosted Card JS [END] ***


 // *** Developer Workflow Script [START] ***
let card_input = document.getElementById("card_image");
let card_image_name = document.getElementById("card_image_name")
card_input.addEventListener("change", () => {
	card_image_name.innerText = card_input.files[0].name;
});

let banner_input = document.getElementById("banner_image");
let banner_image_name = document.getElementById("banner_image_name")
banner_input.addEventListener("change", () => {
	banner_image_name.innerText = banner_input.files[0].name;
});

let site_logo = document.getElementById("site_logo");
let site_logo_name = document.getElementById("site_logo_name")
site_logo.addEventListener("change", () => {
	site_logo_name.innerText = site_logo.files[0].name;
});

let gallery_image1 = document.getElementById("gallery_image1");
let gallery_image1_name = document.getElementById("gallery_image1_name")
gallery_image1.addEventListener("change", () => {
	gallery_image1_name.innerText = gallery_image1.files[0].name;
});

let gallery_image2 = document.getElementById("gallery_image2");
let gallery_image2_name = document.getElementById("gallery_image2_name")
gallery_image2.addEventListener("change", () => {
	gallery_image2_name.innerText = gallery_image2.files[0].name;
});

let gallery_image3 = document.getElementById("gallery_image3");
let gallery_image3_name = document.getElementById("gallery_image3_name")
gallery_image3.addEventListener("change", () => {
	gallery_image3_name.innerText = gallery_image3.files[0].name;
});

let gallery_image4 = document.getElementById("gallery_image4");
let gallery_image4_name = document.getElementById("gallery_image4_name")
gallery_image4.addEventListener("change", () => {
	gallery_image4_name.innerText = gallery_image4.files[0].name;
});
// *** Developer Workflow Script [END] ***


// *** STEP 2: Embed Video Link JS [START] ***
const videoInput = document.querySelector('#video_link');
const videoFrame = document.querySelector('#video_iframe');
const video_save_btn = document.getElementById('video_url_save_btn');
let newVideoUrl;
video_save_btn.disabled = true;

video_save_btn.addEventListener('click', () => {
	document.getElementById('video_url').value = newVideoUrl;
	document.getElementById("video_name").innerText = "Video Embedded";
	$('#video_upload_modal').modal('hide');
})

function closeVideo() {
	const youtubeUrl = videoFrame.src;
	if (youtubeUrl.includes('youtube.com')) {
		videoFrame.src = videoFrame.src.replace(/autoplay=1/, 'autoplay=0'); // Replace autoplay=1 with autoplay=0
	}
	videoFrame.classList.add('d-none');
	videoInput.value = "";
}

videoInput.addEventListener('keyup', () => {
	videoFrame.classList.remove('d-none');
	const youtubeUrl = videoInput.value;
	if (youtubeUrl == '') {
		closeVideo()
		videoFrame.classList.add('d-none');
		video_save_btn.disabled = True
	}

	const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(watch\?v=)?([a-zA-Z0-9-_]+)/;
	const match = youtubeUrl.match(youtubeRegex);

	if (match) {
		const videoId = match[2];
		newVideoUrl = "https://www.youtube.com/embed/${videoId}";
		videoFrame.setAttribute('src', newVideoUrl);
		video_save_btn.disabled = false

	} else {
		videoFrame.setAttribute('src', ''); // Clear the iframe if the link is not a YouTube video
		videoFrame.classList.add('d-none');
		video_save_btn.disabled = true
	}
});
// *** Embed Video Link JS [END] ***


// *** Web_info  [START] ***
let websiteName = document.getElementById('web_name');
let web_category = document.getElementById('web_category');
let estimated_price = document.getElementById('estimated_price');
let description = document.getElementById('description');
// summary web info card
let summary_web_description = document.getElementById('summary_web_description');
let summary_web_category =  document.getElementById('summary_web_category');
let summary_web_url =  document.getElementById('summary_web_url');
let summary_web_name = document.getElementById('summary_web_name');
let summary_estimated_price = document.getElementById('summary_estimated_price');
let webInfoNextBtn = document.getElementById('project_details_next_step');


webInfoNextBtn.addEventListener('click',()=>{
	summary_web_description.innerHTML = description.value;
	summary_web_name.innerHTML = websiteName.value;
	summary_estimated_price.innerHTML = estimated_price.value;
	summary_web_category.innerHTML = web_category.value;
	if(website_url.value != '')
	{
		summary_web_url.innerHTML = website_url.value.trim();
		summary_web_url.setAttribute('href',web_category.value);
	}else{
		summary_web_url.innerHTML = 'Data Not Available';
		summary_web_url.setAttribute('href','#');

	}
});
// *** Web info tags [End] ***

// *** Review Plan [start] ***
let no_of_review_files = document.getElementById('no_of_review_files');
let services = document.getElementById('services');
let documentation_x = document.getElementById('documentation_x');
let sample_data = document.getElementById('sample_data');
let reviewNextBtn = document.getElementById('review_next_btn');
// summary review card
let reviewFiles = document.getElementById('review_files');
let getDoc = document.getElementById('get_doc');
let getServies = document.getElementById('get_services');
let getData = document.getElementById('get_data');
const choosePlanButton = document.querySelector('#btn_review_choose_plan');
const review_plan_summary_card = document.querySelector('#review_plan_summary_card');
let review_amount = document.querySelector('#review_amount');
let review_plan_amount = 0;
let review_plan_status = 'No';
review_plan_amount = parseFloat(0);
// Add click event listener to the "Choose Plan" button

choosePlanButton.addEventListener('click', () => {
	if(sample_data.value != '' && services.value != '' && documentation_x.value != '' && no_of_review_files.value != '')
	{
		if(review_plan_status == 'No')
		{
			// Show SweetAlert confirmation dialog
			Swal.fire({
				title: 'Are you sure you want to choose this plan?',
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'Yes, choose it!',
				cancelButtonText: 'No, cancel',
			})
			.then((result) => {
				// If user confirms
				if (result.isConfirmed) {
					Swal.fire({
						title: 'Review Plan selected',
						icon: 'success',
						showCancelButton: true,
						confirmButtonText: 'OK',
					}).then((result) => {
						if (result.isConfirmed) {
							choosePlanButton.innerHTML = 'Cancel Plan'
							review_plan_status = 'Yes';
							reviewNextBtn.value = 'Next Step';
							review_plan_amount = parseFloat(7800);
							review_amount.innerHTML = review_plan_amount;
						}
					})
				}else{
					review_plan_summary_card.style.display = 'none';
					// reset card value
					no_of_review_files.value = '';
					documentation_x.value = '';
					services.value = '';
					sample_data.value = '';
				}
			});
		}else{
			// Show SweetAlert confirmation dialog
			Swal.fire({
				title: 'Are you sure you want to cancel this plan ?',
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'Yes',
				cancelButtonText: 'No',
			})
			.then((result) => {
				// If user confirms
				if (result.isConfirmed) {
					Swal.fire({
						title: 'Review Plan canceled',
						icon: 'success',
						showCancelButton: true,
						confirmButtonText: 'OK',
					}).then((result) => {
						if (result.isConfirmed) {
							choosePlanButton.innerHTML = 'Choose Plan'
							review_plan_status = 'No';
							reviewNextBtn.value = 'Skip Step';
							review_plan_amount = parseFloat(0);
							review_amount.innerHTML = review_plan_amount;
							// reset card value
							no_of_review_files.value = '';
							documentation_x.value = '';
							services.value = '';
							sample_data.value = '';
						}
					})
				}else{
					review_plan_summary_card.style.display = 'block';
				}
			});
		}
	}else{
		Swal.fire({
			title: 'Please fill data before submiting',
			icon: 'error',
			confirmButtonText: 'Ok',
		})
	}
});


// when user skip the review plan
reviewNextBtn.addEventListener("click", () => {
	if(review_plan_status == 'No')
	{
		review_plan_summary_card.style.display = 'none';
		review_plan_amount = parseFloat(0);
		review_amount.innerHTML = review_plan_amount;
	}
	else{
		review_plan_status = 'Yes';
		review_plan_summary_card.style.display = 'block';
		// review plan data
		reviewFiles.innerHTML = no_of_review_files.value;
		getDoc.innerHTML = documentation_x.value;
		getServies.innerHTML = services.value;
		getData.innerHTML = sample_data.value;
	}
});
// *** Review Plan [end] ***


// *** hosting Plan [start] ***
let hosting_maintenance = document.getElementById('hosting_maintenance');
let custom_dns_domain = document.getElementById('custom_dns_domain');
let no_of_codebase = document.getElementById('no_of_codebase');
let hosting_period = document.getElementById('hosting_period');
let bidding_period = document.getElementById('bidding_period');
let choose_hoster = document.getElementById('choose_hoster');
let hosting_provider = document.getElementById('hosting_provider');
// summary hosting card
let hosting_maintenance_badge = document.getElementById('hosting_maintenance_badge');
let custom_dns_domain_badge = document.getElementById('custom_dns_domain_badge');
let no_of_codebase_badge = document.getElementById('no_of_codebase_badge');
let hosting_period_badge = document.getElementById('hosting_period_badge');
let bidding_period_badge = document.getElementById('bidding_period_badge');
let choose_hoster_badge = document.getElementById('choose_hoster_badge');
let hosting_provider_badge = document.getElementById('hosting_provider_badge');
let hosting_amount = document.getElementById('hosting_amount');
let overAll_total = document.getElementById('overAll_total'); // overall Total
let hostingChoosePlanBtn = document.getElementById('btn_hosting_choose_plan'); // choose hosting plan button
let hosting_plan_summary_card = document.getElementById('hosting_plan_summary_card'); // choose hosting plan button
const hostingNextBtn = document.getElementById('hostingNextBtn');
let hosting_plan_status = 'No';
// set values in order summary card
hostingNextBtn.addEventListener('click',()=>{
	if(website_url.value.trim() == '')
	{
		let hosting_plan_total = 0;
		 hosting_plan_total = parseFloat(hosting_plan_total);
		const hosting_maintenance_value = parseFloat(hosting_maintenance.value) || 0;
		const custom_dns_domain_value = parseFloat(custom_dns_domain.value) || 0;
		const no_of_codebase_value = parseInt(no_of_codebase.value) || 0;
		const hosting_period_value = parseFloat(hosting_period.value) || 0;
		const bidding_period_value = parseFloat(bidding_period.value) || 0;
		const choose_hoster_value = parseFloat(choose_hoster.value) || 0;
		const hosting_provider_value = parseFloat(hosting_provider.value) || 0;

		hosting_plan_total = hosting_maintenance_value + custom_dns_domain_value + (no_of_codebase_value * 50) + hosting_period_value + bidding_period_value + choose_hoster_value + hosting_provider_value;

		hosting_amount.innerText = hosting_plan_total * 82; // currently I take average value of $ in INR. We will add API for geting current $ price.
		if(review_plan_status == 'Yes')
		{
			overAll_total.innerHTML = (hosting_plan_total * 82) + review_plan_amount;
		}else{
			overAll_total.innerHTML = (hosting_plan_total * 82);
		}
		// overall Total set
	}else{
		if(review_plan_status == 'Yes')
		{	hosting_amount.innerHTML = 0;
			overAll_total.innerHTML = review_plan_amount;
		}else{
			hosting_amount.innerHTML = 0;
			overAll_total.innerHTML = 0;
			review_amount.innerHTML = 0;
		}
	}
});

function hostingMaintenanceFun(val){ hosting_maintenance_badge.innerHTML = val;}
function customDnsDomainFun(val){ custom_dns_domain_badge.innerHTML = val; }
function hostingPeriodFun(val) { hosting_period_badge.innerHTML = val; }
function biddingPeriodFun(val) { bidding_period_badge.innerHTML = val; }
function chooseHosterFun(val) { choose_hoster_badge.innerHTML = val; }
function hostProviderFun(val) { hosting_provider_badge.innerHTML = val; }
no_of_codebase.addEventListener("change", () => {
	no_of_codebase_badge.innerHTML = no_of_codebase.value;
});
// sweetalert for hosting plan
hostingChoosePlanBtn.addEventListener('click',()=>{
	if(website_url.value.trim() == '')
	{
		if(hosting_provider.value != '' && choose_hoster.value != '' && bidding_period.value != '' && hosting_period.value != '' && no_of_codebase.value != '' &&custom_dns_domain.value != '' && hosting_maintenance.value != '' )
		{
			Swal.fire({
				title: 'Are you sure you want to choose Hosting plan?',
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'Yes, choose it!',
				cancelButtonText: 'No, cancel',
			})
			.then((result) => {
				// If user confirms
				if (result.isConfirmed) {
					Swal.fire({
						title: 'Hosting Plan selected',
						icon: 'success',
						showCancelButton: true,
						confirmButtonText: 'OK',
					}).then((result) => {
						if (result.isConfirmed) {
							hosting_plan_summary_card.style.display = 'block';
							hostingChoosePlanBtn.innerHTML = 'Cancel Plan';
						}

					})
				}else{
					hosting_plan_summary_card.style.display = 'none';
				}
			})
		}else{
			Swal.fire({
				title: 'Please fill data before submiting',
				icon: 'error',
				confirmButtonText: 'Ok',
			})
		}
	}else{
		hosting_plan_summary_card.style.display = 'none';
		Swal.fire({
			title: 'Your Website Already Hosted',
			icon: 'error',
			showCancelButton: true,
		})
	}
})

// *** hosting Plan [end] ***

