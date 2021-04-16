import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { BasicInfoForRegister } from '../components/Performer'
import StepperForRegister from '../components/Performer/StepperForRegister'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '940px',
        margin: '0 auto'
    },
    registerComp: {
        maxWidth: '940px',
        margin: '30px auto'
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
}));


const PerformerRegister = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    //Stepper関連ここから
    const steps = ['基本情報', 'コンテンツ', 'スケジュール', '身分証明', '支払先情報']
    const compsOrderByStep = [
        <BasicInfoForRegister />
    ]
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    //Stepper関連ここまで
    return (
        <section className={classes.root}>
            <StepperForRegister activeStep={activeStep} setActiveStep={setActiveStep} steps={steps} />

            <div className={classes.registerComp}>
                {compsOrderByStep[activeStep]}
            </div>


            {activeStep === steps.length ? (
                <div>
                    <Button onClick={handleReset}>Reset</Button>
                </div>
            ) : (
                <div>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                    >
                        Back
                            </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            )}
        </section>
    )
}

export default PerformerRegister
