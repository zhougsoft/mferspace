import ReactPlayer from 'react-player/soundcloud'

export default function SoundCloudEmbed({
  url,
  width = '100%',
  height = 200,
}: {
  url: string
  width?: string | number
  height?: string | number
}) {
  return <ReactPlayer url={url} playing loop width={width} height={height} />
}
