import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import PostAuthor from './PostAuthor';
import { fetchPosts, selectAllPosts } from './postsSlice';
import ReactionButtons from './ReactionButtons';
import { TimeAgo } from './TimeAgo';


const PostExcerpt = ({ post }) => {
	return (
		<article className='post-excerpt'>
			<h3>{post.title}</h3>
			<div>
				<PostAuthor userId={post.user} />
				<TimeAgo timestamp={post.date} />
			</div>
			<p className='post-content'>{post.content.substring(0, 100)}</p>
			<ReactionButtons post={post} />
			<Link to={`/posts/${post.id}`} className="button muted-button"> View Post </Link>
		</article>
	)
}



const PostsList = () => {
	const dispatch = useDispatch()
	// const posts = useSelector(state => state.posts);
	const posts = useSelector(selectAllPosts)

	const postStatus = useSelector(state => state.posts.status)
	const error = useSelector(state => state.posts.error)

	useEffect(() => {
		if (postStatus === 'idle') {
			dispatch(fetchPosts())
		}
	}, [postStatus, dispatch])


	/* const orderPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

	const renderPosts = orderPosts.map(post => (
		<article className='post-excerpt' key={post.id}>
			<h3>{post.title}</h3>
			<div>
				<PostAuthor userId={post.user} />
				<TimeAgo timestamp={post.date} />
			</div>
			<p className='post-content'>{post.content.substring(0, 100)}</p>
			<ReactionButtons post={post} />
			<Link to={`/posts/${post.id}`} className="button muted-button"> View Post </Link>
		</article>
	)) */

	let content

	if (postStatus === 'loading') {
		content = <Spinner text="Loadeng..." />
	}
	else if (postStatus === 'succeded') {
		const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
		content = orderedPosts.map(post => (
			<PostExcerpt key={post.id} post={post} />
		))
	}
	else if (postStatus === 'failed') {
		content = <div>{error}</div>
	}

	return (
		<section className='posts-list'>
			<h1>Posts</h1>
			{content}
		</section>
	)
}

export default PostsList
