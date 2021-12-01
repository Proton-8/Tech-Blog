module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  blog_card: (blog, link) => {
		// Constructs the HTML to display a blog. A 'link' boolean determines if the blog  can be clicked on to edit/comment.
		let blogCard = `	<section class='card my-3 mx-auto blog-card'>
			<h2 class='card-header fw-bold'>${blog.blog_name}</h2>
			<div class='card-body'>
				<div class='card-subtitle mb-2 text-muted'>By: ${
					blog.user.name
				} on ${blog.date_created.toLocaleDateString()}</div>
				<div class='card-text fs-5'>${blog.text}</div>
			</div>`;

		if (link) {
			blogCard += `
			<a href='/post/${blog.id}' class='stretched-link'></a>`;
		}

		blogCard += `
		</section>`;
		return blogCard;
	},






};
