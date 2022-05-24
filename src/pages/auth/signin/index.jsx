import React from "react";
import { Card, Row, Col, Divider } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { TranslationSettingProvider } from "provider/TranslationProvider";
import LanguageSelect from "components/LanguageSelect";
import LoginForm from "./components/LoginForm";

function SignInPage() {
    const { t } = useTranslation();
    /** TODO USE LOGO FROM REDUX APP OBJECT */
    /*** Redux State variables */
    const { languages } = useSelector((state) => state.app);

    return (
        <TranslationSettingProvider>
            <Row style={{ height: "100vh" }}>
                <Col span={12} className="dl-brand-container"></Col>
                <Col span={12}>
                    <Card style={{ height: "100%" }}>
                        <Row>
                            <div style={{ width: "100%" }}>
                                <Row>
                                    <LanguageSelect
                                        style={{ float: "right", minWidth: "100" }}
                                        options={languages}
                                    />
                                </Row>
                            </div>
                        </Row>

                        <Row>
                            <div>
                                <h2> {t("signin")} </h2>
                            </div>
                            <Divider />
                            <div style={{ width: "100%" }}>
                                <LoginForm />
                            </div>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </TranslationSettingProvider>
    );
}

export default SignInPage;
