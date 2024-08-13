import React from 'react'
import css from './bottom-nav.module.scss'
import IconPin from 'assets/icons/pin.svg'
import IconSpeakers from 'assets/icons/speakers.svg'
import IconHome from 'assets/icons/home.svg'
import IconInfo from 'assets/icons/info-filled.svg'
import IconSchedule from 'assets/icons/schedule.svg'
import { Link } from 'components/common/link'
import { useRouter } from 'next/router'
import { NavLink, isSelected } from './AppNav'

interface NavLinkWithIcon extends NavLink {
  icon: any
}

const navItems = [
  {
    title: 'Home',
    icon: IconHome,
    to: '/app',
    useIsActive: pathname => {
      return pathname.endsWith('/app')
    },
  },
  {
    title: 'Schedule',
    icon: IconSchedule,
    to: '/app/schedule',
  },
  {
    title: 'Speakers',
    icon: IconSpeakers,
    to: '/app/speakers',
  },
  {
    title: 'Venue',
    icon: IconPin,
    to: '/app/venue',
  },
  {
    title: 'Info',
    icon: IconInfo,
    to: '/app/info',
  },
] as NavLinkWithIcon[]

export const BottomNav = () => {
  const router = useRouter()
  // const [didScrollDown, setDidScrollDown] = React.useState(false)
  // const lastScrollDistance = React.useRef(0)

  // React.useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollDistance = window.scrollY

  //     const scrolledDown = currentScrollDistance > lastScrollDistance.current && currentScrollDistance > 0

  //     // const fullyScrolled = window.innerHeight + currentScrollDistance >= document.body.offsetHeight
  //     const fullHeightIncludingScroll = document.body.offsetHeight

  //     // If scrolling is barely possible (due to not that much vertical content), we don't animate the menu in and out (it feels bad) - we allow a decent threshold before activating animations
  //     const contentTooShort = fullHeightIncludingScroll < window.innerHeight * 1.3
  //     // const isScrollBounce = currentScrollDistance + window.innerHeight >= fullHeightIncludingScroll

  //     if (contentTooShort /* || isScrollBounce*/) return

  //     if (scrolledDown) {
  //       if (!didScrollDown) {
  //         setDidScrollDown(true)
  //       }
  //     } else {
  //       if (didScrollDown) {
  //         setDidScrollDown(false)
  //       }
  //     }

  //     // if (fullyScrolled && lastScrollDistance.current < 0) {
  //     //   setDidScrollDown(false)
  //     // }

  //     lastScrollDistance.current = currentScrollDistance
  //   }

  //   window.addEventListener('scroll', handleScroll)

  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [didScrollDown])

  let className = css['bottom-nav']

  // if (didScrollDown) className += ` ${css['hide']}`

  return (
    <div id="bottom-nav" className={className}>
      <div className={css['items']}>
        {navItems.map(navItem => {
          let className = css['nav-item']

          const selected = isSelected(navItem, router.pathname) // navItem.navItem.useIsActive(router.pathname) // normalizedPathname.includes(navItem.to)

          if (selected) className += ` ${css['selected']}`

          return (
            <Link className={className} key={navItem.to} to={navItem.to}>
              <>
                <navItem.icon />
                <span className={css['title']}>{navItem.title}</span>
              </>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
