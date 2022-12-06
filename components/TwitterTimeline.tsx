import { TwitterTimelineEmbed } from 'react-twitter-embed'

export default function TwitterTimeline({
  username,
  height = 400,
}: {
  username: string
  height?: number
}) {
  return (
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName={username}
      options={{ height }}
      noHeader={true}
    />
  )
}
