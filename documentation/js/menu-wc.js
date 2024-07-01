'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">docs documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="请输入查询关键字"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>入门指南</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>概述
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>手册
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>依赖项
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>属性列表
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">模块列表</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-93af1a5c6cd9095eb22df48a95170c251b2afae5fbc95d19ad84edd4302bf4fa5b3fb92d056b48e236f58b36d93484ca7da3b114352727df1ec1a35433073954"' : 'data-bs-target="#xs-components-links-module-AppModule-93af1a5c6cd9095eb22df48a95170c251b2afae5fbc95d19ad84edd4302bf4fa5b3fb92d056b48e236f58b36d93484ca7da3b114352727df1ec1a35433073954"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>组件列表</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-93af1a5c6cd9095eb22df48a95170c251b2afae5fbc95d19ad84edd4302bf4fa5b3fb92d056b48e236f58b36d93484ca7da3b114352727df1ec1a35433073954"' :
                                            'id="xs-components-links-module-AppModule-93af1a5c6cd9095eb22df48a95170c251b2afae5fbc95d19ad84edd4302bf4fa5b3fb92d056b48e236f58b36d93484ca7da3b114352727df1ec1a35433073954"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeStartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeStartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShoppingEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShoppingEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShoppingListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShoppingListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-AppModule-93af1a5c6cd9095eb22df48a95170c251b2afae5fbc95d19ad84edd4302bf4fa5b3fb92d056b48e236f58b36d93484ca7da3b114352727df1ec1a35433073954"' : 'data-bs-target="#xs-directives-links-module-AppModule-93af1a5c6cd9095eb22df48a95170c251b2afae5fbc95d19ad84edd4302bf4fa5b3fb92d056b48e236f58b36d93484ca7da3b114352727df1ec1a35433073954"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>指令列表</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-93af1a5c6cd9095eb22df48a95170c251b2afae5fbc95d19ad84edd4302bf4fa5b3fb92d056b48e236f58b36d93484ca7da3b114352727df1ec1a35433073954"' :
                                        'id="xs-directives-links-module-AppModule-93af1a5c6cd9095eb22df48a95170c251b2afae5fbc95d19ad84edd4302bf4fa5b3fb92d056b48e236f58b36d93484ca7da3b114352727df1ec1a35433073954"' }>
                                        <li class="link">
                                            <a href="directives/DropdownDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DropdownDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-93af1a5c6cd9095eb22df48a95170c251b2afae5fbc95d19ad84edd4302bf4fa5b3fb92d056b48e236f58b36d93484ca7da3b114352727df1ec1a35433073954"' : 'data-bs-target="#xs-injectables-links-module-AppModule-93af1a5c6cd9095eb22df48a95170c251b2afae5fbc95d19ad84edd4302bf4fa5b3fb92d056b48e236f58b36d93484ca7da3b114352727df1ec1a35433073954"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>可注入的</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-93af1a5c6cd9095eb22df48a95170c251b2afae5fbc95d19ad84edd4302bf4fa5b3fb92d056b48e236f58b36d93484ca7da3b114352727df1ec1a35433073954"' :
                                        'id="xs-injectables-links-module-AppModule-93af1a5c6cd9095eb22df48a95170c251b2afae5fbc95d19ad84edd4302bf4fa5b3fb92d056b48e236f58b36d93484ca7da3b114352727df1ec1a35433073954"' }>
                                        <li class="link">
                                            <a href="injectables/ShoppingListService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShoppingListService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>类列表</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Ingredient.html" data-type="entity-link" >Ingredient</a>
                            </li>
                            <li class="link">
                                <a href="classes/Recipe.html" data-type="entity-link" >Recipe</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>可注入的</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/RecipeService.html" data-type="entity-link" >RecipeService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>其他</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">变量</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>路由列表</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>文档概览</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});