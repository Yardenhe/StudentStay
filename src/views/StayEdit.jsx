import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { stayService } from "../services/stay.service";
import { FirstPage } from "../components/StayEditCmps/FirstPage";
import { SecondPage } from "../components/StayEditCmps/SecondPage";
import { ThirdPage } from "../components/StayEditCmps/ThirdPage";
import { FourthPage } from "../components/StayEditCmps/FourthPage";
import { FifthPage } from "../components/StayEditCmps/FifthPage";
import { SixthPage } from "../components/StayEditCmps/SixthPage";
import { SeventhPage } from "../components/StayEditCmps/SeventhPage";
import { EighthPage } from "../components/StayEditCmps/EighthPage";
import { NinthPage } from "../components/StayEditCmps/NinthPage"
import { TenthPage } from "../components/StayEditCmps/TenthPage"
import { ElevenPage } from "../components/StayEditCmps/ElevenPage";






export function StayEdit() {
    const [stay, setStay] = useState(stayService.getEmptyStay())
    const { onSaveStay } = useOutletContext()
    const { stayId } = useParams()
    const [step, setStep] = useState(1);

    const pages = [
        { component: <FirstPage /> },
        { component: <SecondPage onSetStay={onSetStay} stay={stay} /> },
        { component: <ThirdPage onSetStay={onSetStay} stay={stay} /> },
        { component: <FourthPage onSetStay={onSetStay} stay={stay} /> },
        { component: <FifthPage onSetStay={onSetStay} stay={stay} /> },
        { component: <SixthPage onSetStay={onSetStay} stay={stay} /> },
        { component: <SeventhPage onSetStay={onSetStay} stay={stay} /> },
        { component: <EighthPage onSetStay={onSetStay} stay={stay} /> },
        { component: <NinthPage onSetStay={onSetStay} stay={stay} /> },
        { component: <TenthPage onSetStay={onSetStay} stay={stay} /> },
        { component: <ElevenPage onSetStay={onSetStay} stay={stay} /> },

    ];
    const currentPage = pages[step - 1];

    useEffect(() => {
        loadStay()
    }, [])

    async function loadStay() {
        if (stayId) {
            const stay = await stayService.getById(stayId)
            setStay(stay)
        }

    }

    function onSetStay(fieldsToUpdate) {
        fieldsToUpdate = { ...stay, ...fieldsToUpdate }
        setStay(fieldsToUpdate)
    }
    function onSubmitStay() {
        try {
            onSaveStay(stay)
        } catch (err) {
            console.log('Had issues adding stay', err);
        }
    }
    return (
        <section className="stay-edit">
            <section className="edit-header">
                {/* <Link to="/">  <img src="../img/general-icons/airbnbBlack.svg" ></img></Link> */}
                {/* <h1>{stayId ? 'Edit' : 'Add'} Stay</h1> */}
            </section>
            <section className="edit-main">
                {currentPage.component}
            </section>
            <section className="edit-footer">
                <div className="footer-loader" >
                    <div className="loader" ></div>
                </div>
                <section className="footer-btns">

                    <button className="back-btn" disabled={step <= 1} onClick={() => setStep(step - 1)}>Back</button>
                    {step === pages.length ? <button className="next-btn" onClick={() => onSubmitStay()}>Submit</button> :
                        <button className="next-btn" onClick={() => setStep(step === pages.length ? 1 : step + 1)}>Next</button>}

                </section>
            </section>
        </section>
    )
}
