import React, {ChangeEvent, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Divider, FormControl, InputLabel, Typography} from "@material-ui/core";

import {useChangeLanguageStyles} from "./ChangeLanguageStyles";
import {FilledSelect} from "../../../../../components/FilledSelect/FilledSelect";
import {selectUserData, selectUserIsLoading} from "../../../../../store/ducks/user/selectors";
import {setUserLoadingStatus, updateLanguage} from "../../../../../store/ducks/user/actionCreators";
import {LoadingStatus} from "../../../../../store/types";
import {withDocumentTitle} from "../../../../../hoc/withDocumentTitle";

const ChangeLanguage: FC = (): ReactElement => {
    const classes = useChangeLanguageStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const isLoading = useSelector(selectUserIsLoading);
    const [language, setLanguage] = useState<string>("");

    useEffect(() => {
        if (myProfile) {
            setLanguage(myProfile?.language!);
        }

        return () => {
            dispatch(setUserLoadingStatus(LoadingStatus.NEVER));
        };
    }, []);

    const changeLanguage = (event: ChangeEvent<{ value: unknown }>): void => {
        setLanguage(event.target.value as string);
    };

    const onSubmit = (): void => {
        dispatch(updateLanguage({language}));
    };

    return (
        <>
            <div className={classes.selectWrapper}>
                <FormControl variant="filled">
                    <InputLabel htmlFor="select-language">
                        Display Language
                    </InputLabel>
                    <FilledSelect
                        variant="filled"
                        labelId="select-language"
                        id="select-language"
                        native
                        value={language}
                        onChange={changeLanguage}
                        label="Display Language"
                        fullWidth
                    >
                        <option aria-label="None"/>
                        {languages()}
                    </FilledSelect>
                </FormControl>
                <Typography variant={"subtitle2"} component={"div"} className={classes.languageInfo}>
                    Select your preferred language for headlines, buttons, and other text from Twitter on this account.
                    This does not change the language of the content you see in your timeline.
                </Typography>
            </div>
            <Divider/>
            <div className={classes.buttonWrapper}>
                <Button
                    onClick={onSubmit}
                    disabled={isLoading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Save
                </Button>
            </div>
        </>
    );
};

export default withDocumentTitle(ChangeLanguage)("Change display language");

const languages = (): JSX.Element => {
    return (
        <>
            <option value="Arabic - ??????????????">Arabic - ??????????????</option>
            <option value="Arabic (Feminine) - ?????????????? (????????)">Arabic (Feminine) - ?????????????? (????????)</option>
            <option value="Bangla - ???????????????">Bangla - ???????????????</option>
            <option value="Basque (beta) - euskara">Basque (beta) - euskara</option>
            <option value="British English">British English</option>
            <option value="Bulgarian - ??????????????????">Bulgarian - ??????????????????</option>
            <option value="Catalan - catal??">Catalan - catal??</option>
            <option value="Croatian - hrvatski">Croatian - hrvatski</option>
            <option value="Czech - ??e??tina">Czech - ??e??tina</option>
            <option value="Danish - dansk">Danish - dansk</option>
            <option value="Dutch - Nederlands">Dutch - Nederlands</option>
            <option value="English">English</option>
            <option value="Filipino">Filipino</option>
            <option value="Finnish - suomi">Finnish - suomi</option>
            <option value="French - fran??ais">French - fran??ais</option>
            <option value="Galician (beta) - galego">Galician (beta) - galego</option>
            <option value="German - Deutsch">German - Deutsch</option>
            <option value="Greek - ????????????????">Greek - ????????????????</option>
            <option value="Gujarati - ?????????????????????">Gujarati - ?????????????????????</option>
            <option value="Hebrew - ??????????">Hebrew - ??????????</option>
            <option value="Hindi - ??????????????????">Hindi - ??????????????????</option>
            <option value="Hungarian - magyar">Hungarian - magyar</option>
            <option value="Indonesian - Indonesia">Indonesian - Indonesia</option>
            <option value="Irish (beta) - Gaeilge">Irish (beta) - Gaeilge</option>
            <option value="Italian - italiano">Italian - italiano</option>
            <option value="Japanese - ?????????">Japanese - ?????????</option>
            <option value="Kannada - ???????????????">Kannada - ???????????????</option>
            <option value="Korean - ?????????">Korean - ?????????</option>
            <option value="Malay - Melayu">Malay - Melayu</option>
            <option value="Marathi - ???????????????">Marathi - ???????????????</option>
            <option value="Norwegian - norsk">Norwegian - norsk</option>
            <option value="Persian - ??????????">Persian - ??????????</option>
            <option value="Polish - polski">Polish - polski</option>
            <option value="Portuguese - portugu??s">Portuguese - portugu??s</option>
            <option value="Romanian - rom??n??">Romanian - rom??n??</option>
            <option value="Russian - ??????????????">Russian - ??????????????</option>
            <option value="Serbian - ????????????">Serbian - ????????????</option>
            <option value="Simplified Chinese - ????????????">Simplified Chinese - ????????????</option>
            <option value="Slovak - sloven??ina">Slovak - sloven??ina</option>
            <option value="Spanish - espa??ol">Spanish - espa??ol</option>
            <option value="Swedish - svenska">Swedish - svenska</option>
            <option value="Tamil - ???????????????">Tamil - ???????????????</option>
            <option value="Thai - ?????????">Thai - ?????????</option>
            <option value="Traditional Chinese - ????????????">Traditional Chinese - ????????????</option>
            <option value="Turkish - T??rk??e">Turkish - T??rk??e</option>
            <option value="Ukrainian - ????????????????????">Ukrainian - ????????????????????</option>
            <option value="Urdu (beta) - ????????">Urdu (beta) - ????????</option>
            <option value="Vietnamese - Ti???ng Vi???t">Vietnamese - Ti???ng Vi???t</option>
        </>
    );
};
