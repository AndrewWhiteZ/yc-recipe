import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiEditorModule, TUI_EDITOR_EXTENSIONS, TUI_EDITOR_DEFAULT_EXTENSIONS } from '@tinkoff/tui-editor';
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, TuiButtonModule, TuiSvgModule, TuiPrimitiveTextfieldModule, TuiTextfieldControllerModule, TuiLinkModule } from "@taiga-ui/core";
import { TuiInputFilesModule, TuiInputModule, TuiInputPasswordModule, TuiIslandModule, TuiMarkerIconModule, TuiPromptModule, TuiTabsModule, TuiTextareaModule, TuiTilesModule } from '@taiga-ui/kit';
import { TuiBlockStatusModule } from '@taiga-ui/layout';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { INJECTOR, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RecipeIndexPageComponent } from './component/recipe-index-page/recipe-index-page.component';
import { RecipePageComponent } from './component/recipe-page/recipe-page.component';
import { RecipeConstructorPageComponent } from './component/recipe-constructor-page/recipe-constructor-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeIndexPageComponent,
    RecipePageComponent,
    RecipeConstructorPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
    TuiBlockStatusModule,
    TuiTilesModule,
    TuiTabsModule,
    TuiSvgModule,
    TuiTextareaModule,
    TuiPrimitiveTextfieldModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiAlertModule,
    TuiIslandModule,
    TuiInputFilesModule,
    TuiMarkerIconModule,
    TuiLinkModule,
    TuiEditorModule,
    TuiPromptModule,
],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
    {
      provide: TUI_EDITOR_EXTENSIONS,
      deps: [INJECTOR],
      useFactory: (injector: Injector) => [
        ...TUI_EDITOR_DEFAULT_EXTENSIONS,
        import('@tinkoff/tui-editor/extensions/image-editor').then(({tuiCreateImageEditorExtension}) =>
          tuiCreateImageEditorExtension({injector}),
        ),
      ],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
