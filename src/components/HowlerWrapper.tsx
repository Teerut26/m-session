import { NextPage } from 'next'
import ReactHowler from 'react-howler'

interface Props {
    url:string
}

const HowlerWrapper: NextPage<Props> = ({url}) => {
    return (
        <>
        {/* <ReactHowler src={[""]} playing={true} /> */}
        <audio autoPlay src="https://pipedproxy-bom-2.kavin.rocks/videoplayback?expire=1676313766&ei=RjDqY9-RJbm4vcAP66qn2A8&ip=140.238.251.167&id=o-AG0g8E-0I1na_yheSGJB5tr38NA52ytyVC1p3zFD3GNs&itag=140&source=youtube&requiressl=yes&mh=CP&mm=31%2C29&mn=sn-cvhelnls%2Csn-cvh7kn6l&ms=au%2Crdu&mv=m&mvi=3&pl=26&gcr=in&initcwndbps=2566250&spc=H3gIhsCHUJRiSaWTjFsLVMZ0V21Zhk4&vprv=1&svpuc=1&mime=audio%2Fmp4&gir=yes&clen=3437350&dur=212.253&lmt=1672208419563079&mt=1676291835&fvip=1&keepalive=yes&fexp=24007246&c=ANDROID&txp=2318224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAM9PJNSExa4Q8LT-zPURkdSU4WV1i28wSkPxE_aM41UCAiAtKnF2KC12XWW__v4H7-96104xKpDtdvnwpzJzvs66iw%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgMp1W53SCfky_U4z5sWrh17BEsU4FHmGBou_RUr2gtZUCIQCxX9-db9ZhrgoWqb8fTCQERAJg5xfr5nZe3a2iNFtEkA%3D%3D&cpn=LecVt7wEHvysMOLK&host=rr3---sn-cvhelnls.googlevideo.com"></audio>
        </>
    )
}

export default HowlerWrapper