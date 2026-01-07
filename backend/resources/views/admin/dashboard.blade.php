<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Admin Dashboard</title>
	@vite(['resources/css/app.css', 'resources/js/app.js'])
	<style>
		body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"; }
		.container { max-width: 960px; margin: 2rem auto; padding: 1rem; }
		.card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.25rem; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
		.header { display: flex; align-items: center; justify-content: space-between; }
		.badge { background: #111827; color: white; padding: 0.25rem 0.5rem; border-radius: 999px; font-size: 0.75rem; }
		.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); margin-top: 1rem; }
		.grid .tile { border: 1px dashed #d1d5db; border-radius: 8px; padding: 1rem; text-align: center; color: #6b7280; }
		a { color: #2563eb; text-decoration: none; }
		a:hover { text-decoration: underline; }
	</style>
	</head>
<body>
	<div class="container">
		<div class="header">
			<h1>Admin Dashboard</h1>
			<span class="badge">{{ auth()->user()->name ?? 'Admin' }}</span>
		</div>
		<div class="card">
			<p>You're logged in as <strong>{{ auth()->user()->email ?? 'admin@example.com' }}</strong>.</p>
			<p>Use this area to manage your application.</p>
		</div>
		<div class="grid">
			<div class="tile">Users</div>
			<div class="tile">Settings</div>
			<div class="tile">Reports</div>
		</div>
		<p style="margin-top: 1rem;"><a href="{{ url('/') }}">&larr; Back to site</a></p>
	</div>
</body>
</html>


