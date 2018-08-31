package com.shitu;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.getui.reactnativegetui.GetuiModule;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this, R.style.SplashScreenTheme);

        super.onCreate(savedInstanceState);
        GetuiModule.initPush(this);

    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ShiTu";
    }
}
