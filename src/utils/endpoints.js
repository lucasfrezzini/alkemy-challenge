export const API_KEY = 'd8ae4181638365c66eeed968ae25b657';
export const LANGUAGE = 'en-US';

const DISCOVER_SORTS = {
    popularity: 'popularity.desc',
    revenue: 'revenue.desc',
    release: 'release_date.desc',
    vote_average: 'vote_average.desc'
}

const MOVIES_QUERYS = {
    top_rated: 'top_rated',
    popular: 'popular',
    upcoming: 'upcoming',
    now_playing: 'now_playing',
    latest: 'latest'
}

export const endPoints = {
    top_rated : `https://api.themoviedb.org/3/movie/${MOVIES_QUERYS.top_rated}?api_key=${API_KEY}&language=${LANGUAGE}`,
    trending: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=${LANGUAGE}`,
    popular : `https://api.themoviedb.org/3/movie/${MOVIES_QUERYS.popular}?api_key=${API_KEY}&language=${LANGUAGE}`,
    upcoming : `https://api.themoviedb.org/3/movie/${MOVIES_QUERYS.upcoming}?api_key=${API_KEY}&language=${LANGUAGE}`,
    now_playing : `https://api.themoviedb.org/3/movie/${MOVIES_QUERYS.now_playing}?api_key=${API_KEY}&language=${LANGUAGE}`,
    latest : `https://api.themoviedb.org/3/movie/${MOVIES_QUERYS.latest}?api_key=${API_KEY}&language=${LANGUAGE}`,
    discover_popularity: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${LANGUAGE}&sort_by=${DISCOVER_SORTS.popularity}`,
    discover_revenue: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${LANGUAGE}&sort_by=${DISCOVER_SORTS.revenue}`,
    discover_release_date: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${LANGUAGE}&sort_by=${DISCOVER_SORTS.release_date}`,
    discover_vote_average: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${LANGUAGE}&sort_by=${DISCOVER_SORTS.vote_average}`,
}