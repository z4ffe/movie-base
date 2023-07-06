import {useEffect, useState} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Auth from '../components/auth/Auth.tsx'
import {AddArticle} from '../components/dashboard/AddArticle.tsx'
import {ArticlesPanel} from '../components/dashboard/ArticlesPanel.tsx'
import {Dashboard} from '../components/dashboard/Dashboard.tsx'
import {DashboardMain} from '../components/dashboard/DashboardMain.tsx'
import {EditArticle} from '../components/dashboard/EditArticle.tsx'
import {ProfilePanel} from '../components/dashboard/ProfilePanel.tsx'
import {Home} from '../components/home/Home.tsx'
import Header from '../components/navigation/Header.tsx'
import {AuthGuard} from '../guards/AuthGuard.tsx'
import MainLayout from '../layouts/MainLayout.tsx'
import {useAppDispatch, useAppSelector} from '../lib/redux/hooks.ts'
import {Loader} from '../shared/Loader.tsx'
import {isAuth} from '../store/users/usersThunk.ts'

const Router = () => {
	const usersReducer = useAppSelector((state: any) => state.users)
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		dispatch(isAuth())
	}, [])

	useEffect(() => {
		if (usersReducer.auth !== null) {
			setLoading(false)
		}
	}, [usersReducer])

	return (
		<BrowserRouter>
			{loading ? <Loader /> :
				<>
					<Header />
					<MainLayout>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='auth' element={<Auth />} />
							<Route path='dashboard' element={<AuthGuard><Dashboard /></AuthGuard>}>
								<Route index element={<DashboardMain />} />
								<Route path='articles' element={<ArticlesPanel />} />
								<Route path='profile' element={<ProfilePanel />} />
								<Route path='articles/add' element={<AddArticle />} />
								<Route path='articles/edit/:id' element={<EditArticle />} />
							</Route>
						</Routes>
					</MainLayout>
				</>
			}
		</BrowserRouter>
	)
}

export default Router
