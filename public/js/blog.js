const formSubmitHandler = async event => {
	event.preventDefault();

	const title = document.querySelector('#blog_name').value.trim();
	const content = document.querySelector('#blog_text').value.trim();

	// Make sure we have title and content
	if (title && content) {
		// If the form has a 'data-id' attribute, we know we're updating an existing post
		if (event.target.hasAttribute('data-id')) {
			const id = event.target.getAttribute('data-id');

			// Update the blog post title and content
			const response = await fetch(`/api/blogs/${id}`, {
				method: 'PUT',
				body: JSON.stringify({ title, content }),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				// Redirect back to the user's dashboard to see the updated blog post
				document.location.replace('/dashboard');
			} else {
				alert('Failed to update blog');
			}
		} else {
			// Create a new blog post
			const response = await fetch(`/api/blogRoutes`, {
				method: 'POST',
				body: JSON.stringify({ blog_name, blog_text }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.ok) {
				// Redirect back to the user's dashboard to see the new blog post
				document.location.replace('/dashboard');
			} else {
				alert('Failed to create blog');
			}
		}
	}
};

async function deletePost() {
	const id = document.querySelector('#delete-blog').getAttribute('data-id');
	// Delete the target blog post
	const response = await fetch(`/api/blogs/${id}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		// Redirect back to the user's dashboard
		document.location.replace('/dashboard');
	} else {
		alert('Failed to delete blog post');
	}
}

document
	.querySelector('.post-form')
	.addEventListener('submit', formSubmitHandler);
