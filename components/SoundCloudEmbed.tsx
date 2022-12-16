import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) // dynamic import to prevent NextJS rehydration error after embedded media is fetched & rendered

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
