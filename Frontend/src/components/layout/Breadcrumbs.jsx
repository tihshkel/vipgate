import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
  const location = useLocation()
  
  // Определяем хлебные крошки в зависимости от пути
  const getBreadcrumbs = () => {
    const path = location.pathname
    
    if (path === '/') {
      return [{ name: 'Главная', path: '/' }]
    }
    
                if (path === '/fast-track') {
                  return [
                    { name: 'Главная', path: '/' },
                    { name: 'Fast Track', path: '/fast-track' }
                  ]
                }
                
                if (path === '/vip-lounge') {
                  return [
                    { name: 'Главная', path: '/' },
                    { name: 'VIP lounge', path: '/vip-lounge' }
                  ]
                }
                
                if (path === '/transfer') {
                  return [
                    { name: 'Главная', path: '/' },
                    { name: 'Transfer', path: '/transfer' }
                  ]
                }
                
                if (path === '/meet-assist') {
                  return [
                    { name: 'Главная', path: '/' },
                    { name: 'Meet & assist', path: '/meet-assist' }
                  ]
                }
    
    if (path.startsWith('/profile')) {
      const crumbs = [{ name: 'Главная', path: '/' }]
      if (path === '/profile') {
        crumbs.push({ name: 'Личный кабинет', path: '/profile' })
      } else if (path === '/profile/personal-data') {
        crumbs.push({ name: 'Личный кабинет', path: '/profile' })
        crumbs.push({ name: 'Личные данные', path: '/profile/personal-data' })
      }
      return crumbs
    }
    
    return [{ name: 'Главная', path: '/' }]
  }
  
  const breadcrumbs = getBreadcrumbs()
  
  if (breadcrumbs.length <= 1) {
    return null
  }
  
  return (
    <nav className="bg-white py-3">
      <div className="container mx-auto px-4 md:px-8">
        <ol className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-vip-blue font-semibold">{crumb.name}</span>
              ) : (
                <Link 
                  to={crumb.path} 
                  className="text-gray-600 hover:text-vip-blue transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

export default Breadcrumbs
