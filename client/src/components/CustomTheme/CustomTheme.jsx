import React from 'react'
import "./CustomTheme.scss"

const CustomTheme = () => {

    // useref
    const themeRef = React.useRef(null);
    const ModalRef = React.useRef(null);
    const fontRef = React.useRef(null);
    const colorRef = React.useRef(null);
    const bgRef = React.useRef(null);

    const [color, setColor] = React.useState();

    // addEventListener to themeRef
    React.useEffect(() => {
        // open modal
        themeRef.current.addEventListener('click', () => {
            ModalRef.current.style.display = 'grid';
        }
        , false);
        // close ModalRef when click outside of it
        window.addEventListener('click', (e) => {
            if (e.target === ModalRef.current) {
                ModalRef.current.style.display = 'none';
            }
        }
        , false);

        const removeActiveClass = (ref) => {
            ref.current.childNodes.forEach(node => {
                node.classList.remove('active');
            }
            , false);
        }
// ─────────────────────────────────CHANGER LA POLICE EN Blanc───────────────────────────────────────────────

        const setFontToWhite = () => {
            document.body.style.setProperty('color', "white");
            document.querySelector('.btn').style.setProperty('color', "white");
            document.querySelector('.btn-primary').style.setProperty('color', "white !important");
            themeRef.current.style.setProperty('color', 'white');
            // set all inputs to white
            document.querySelectorAll('input').forEach(input => {
                input.style.setProperty('color', "white");
            }
            , false);
            // change police color for .mantine-Modal-modal
            // document.querySelector('.mantine-Modal-modal').style.setProperty('color', "white !important");
        }

// ─────────────────────────────────CHANGER LA POLICE EN NOIR───────────────────────────────────────────────
        const setFontToBlack = () => {
            document.body.style.setProperty('color', "black");
            document.querySelector('.btn').style.setProperty('color', "black");
            // set all inputs to white
            document.querySelectorAll('input').forEach(input => {
                input.style.setProperty('color', "black");
            }
            , false);
        }

// ─────────────────────────────────CHANGER LA TAILLE DE LA POLICE───────────────────────────────────────────────

        fontRef.current.childNodes.forEach(element => {
            let fontSize;
            //  on clicl on element
            element.addEventListener('click', () => {
                // if element is not selected
                if (element.classList.contains('font-size-1')) {
                    removeActiveClass(fontRef)
                    document.querySelector('.Home').style.setProperty('grid-template-columns', '18em auto 18em');
                    fontSize= '11px';
                    element.classList.toggle('active');
                } else if(element.classList.contains('font-size-2')) {
                    removeActiveClass(fontRef)
                    document.querySelector('.Home').style.setProperty('grid-template-columns', '18em auto 18em');
                    fontSize= '13px';
                    element.classList.toggle('active');
                } else if(element.classList.contains('font-size-3')) {
                    removeActiveClass(fontRef)
                    document.querySelector('.Home').style.setProperty('grid-template-columns', '18em auto 18em');
                    fontSize= '16px';
                    element.classList.toggle('active');
                } else if (element.classList.contains('font-size-4')) {
                    removeActiveClass(fontRef)
                    // change grid-template-columns of .home
                    document.querySelector('.Home').style.setProperty('grid-template-columns', '18em auto 18em');
                    fontSize= '19px';
                    element.classList.toggle('active');
                } else if (element.classList.contains('font-size-5')) {
                    removeActiveClass(fontRef)
                    document.querySelector('.Home').style.setProperty('grid-template-columns', '18em auto 14em');
                    fontSize= '21px';
                    element.classList.toggle('active');
                }

                // change font size of the root html element
                document.querySelector('html').style.fontSize = fontSize;
            }
            , false);

        });


// ─────────────────────────────────CHANGER LA COULEUR PRINCIPALE───────────────────────────────────────────────

        colorRef.current.childNodes.forEach(element => {
            //  on clicl on element
            let primaryHue;
            element.addEventListener('click', () => {
                // if element is not selected
                if (element.classList.contains('color-1')) {
                    removeActiveClass(colorRef)
                    primaryHue = 252;
                    // setColor(252);
                    element.classList.toggle('active');
                } else if(element.classList.contains('color-2')) {
                    removeActiveClass(colorRef)
                    primaryHue = 52;
                    // setColor(52);
                    element.classList.toggle('active');
                } else if(element.classList.contains('color-3')) {
                    removeActiveClass(colorRef)
                    primaryHue = 352;
                    // setColor(352);
                    element.classList.toggle('active');
                } else if (element.classList.contains('color-4')) {
                    removeActiveClass(colorRef)
                    primaryHue = 152;
                    // setColor(152);
                    element.classList.toggle('active');
                } else if (element.classList.contains('color-5')) {
                    removeActiveClass(colorRef)
                    primaryHue = 202;
                    // setColor(202);
                    element.classList.toggle('active');
                }

                // change font size of the root html element
                document.querySelector(':root').style.setProperty('--primary-color-hue', primaryHue);
            }
            , false);

        });

// ─────────────────────────────────CHANGER LE FOND DU SITE───────────────────────────────────────────────

        bgRef.current.childNodes.forEach(element => {
            //  on clicl on element
            let lightColorLightness;
            let whiteColorLightness;
            let darColorLightness;

            element.addEventListener('click', () => {
                // if element is not selected
                if (element.classList.contains('bg-1')) {
                    removeActiveClass(bgRef)
                    darColorLightness = '17%%';
                    whiteColorLightness = '100%';
                    lightColorLightness = '95%';
                    setFontToBlack();
                    element.classList.toggle('active');
                } else if(element.classList.contains('bg-2')) {
                    removeActiveClass(bgRef)
                    darColorLightness = '95%';
                    whiteColorLightness = '20%';
                    lightColorLightness = '15%';
                    setFontToWhite();
                    removeActiveClass(bgRef)
                    element.classList.toggle('active');
                } else if(element.classList.contains('bg-3')) {
                    darColorLightness = '95%';
                    whiteColorLightness = '10%';
                    lightColorLightness = '0%';
                    setFontToWhite();
                    removeActiveClass(bgRef)
                    element.classList.toggle('active');
                }

                // change font size of the root html element
                // change property color of body
                document.querySelector(':root').style.setProperty('--dar-color-lightness', darColorLightness);
                document.querySelector(':root').style.setProperty('--white-color-lightness', whiteColorLightness);
                document.querySelector(':root').style.setProperty('--light-color-lightness', lightColorLightness);
            }
            , false);

        }
        , false);
    }
    , [themeRef, fontRef, ModalRef, color]);


  return (
    <div className="CustomTheme">
        <button ref={themeRef} className='btn btn-primary'><i className="uil uil-palette"></i> Theme</button>
        <div ref={ModalRef} className="customize-theme">
            <div className="card">
                <h2>Customize your view</h2>
                <p className='text-muted'>Manage your font size, color, and background.</p>

                <div className="font-size">
                    <h4>Font Size</h4>
                    <div>
                        <h6>Aa</h6>
                        <div ref={fontRef} className="choose-size">
                            <span className="font-size-1"></span>
                            <span className="font-size-2"></span>
                            <span className="font-size-3 active"></span>
                            <span className="font-size-4"></span>
                            <span className="font-size-5"></span>
                        </div>
                        <h3>Aa</h3>
                    </div>
                </div>

                <div className="color">
                    <h4>Color</h4>
                    <div ref={colorRef} className='choose-color'>
                        <span className="color-1 active"></span>
                        <span className="color-2"></span>
                        <span className="color-3"></span>
                        <span className="color-4"></span>
                        <span className="color-5"></span>
                    </div>
                </div>

                <div className="background">
                    <h4>Background</h4>
                    <div ref={bgRef} className="choose-bg">
                        <div className="bg-1 active">
                            <span></span>
                            <h5 htmlFor="bg-1">Light</h5>
                        </div>
                        <div className="bg-2">
                            <span></span>
                            <h5 htmlFor="bg-2">Dim</h5>
                        </div>
                        <div className="bg-3">
                            <span></span>
                            <h5 htmlFor="bg-3">Lights Out</h5>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CustomTheme