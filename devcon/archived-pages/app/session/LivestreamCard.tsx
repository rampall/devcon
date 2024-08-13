import React from 'react'
import css from './livestream.module.scss'
import { Session } from 'types/Session'
import moment from 'moment'
import { useAppContext } from 'context/app-context'
import { ThumbnailBlock } from 'components/common/thumbnail-block'
import { EVENT_DAYS, STREAMING_URL } from 'utils/constants'
import LivestreamIcon from './livestream-icon.png'
import { Link } from 'components/common/link'

interface Props {
  session: Session
  relativeTime: string
}

export const LivestreamCard = (props: Props) => {
  const { now } = useAppContext()
  if (!now) return <></>

  const start = moment.utc(props.session.start)
  const end = moment.utc(props.session.end)
  const sessionUpcoming = now.isBefore(start)
  const sessionEnded = now.isAfter(end)
  const isOngoing = !sessionUpcoming && !sessionEnded

  const eventStartTime = moment('09:45:00', 'hh:mm:ss')
  const eventEndTime = moment('18:15:00', 'hh:mm:ss')
  const isStreamActive = now.isBetween(eventStartTime, eventEndTime) && EVENT_DAYS.includes(now.date())

  return (
    <div className={css['container']}>
      <h4 className={css['subtitle']}>Livestream {isOngoing && <div className="label red sm">Session is live</div>}</h4>

      <div>
        {isStreamActive &&
          <div className={css['responsive']}>
            <iframe className={css['iframe']} src={`${STREAMING_URL}stage/${props.session.room?.id}/embed`} frameBorder="0" allow="autoplay; encrypted-media"></iframe>
          </div>
        }
        <ThumbnailBlock className={css['banner']}
          thumbnail={LivestreamIcon.src}>
          <div className={css['content']}>
            <p className="font-xs-fixed">
              {isStreamActive && 'Livestream is currently active.'}
              {!isStreamActive && sessionUpcoming && 'Waiting for scheduled Livestream to begin.'}
              {!isStreamActive && sessionEnded && <>Visit our <Link to='https://archive.devcon.org/'>archive</Link> to watch the recordings.</>}
            </p>
            <p className="bold font-xs-fixed">
              {(() => {
                if (isOngoing) return 'Session is happening now'

                if (sessionUpcoming) {
                  return `Session starts in ${props.relativeTime}`
                } else {
                  return `Session ended ${props.relativeTime} ago`
                }
              })()}
            </p>
            <p className={css['powered-by']}>Powered by Livepeer</p>
          </div>
        </ThumbnailBlock>
      </div>
    </div>
  )
}
