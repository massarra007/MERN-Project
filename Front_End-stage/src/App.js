import "./App.css";
import React, { Component } from "react";
import { createContext, useEffect, useState } from "react";
import ReactSwitch from "react-switch";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signin from "./components/signin/signin.js";
import UpdateCV from "./components/update_cv/update_cv";
import CreateEnseignant from "./components/crud_enseignant/create_enseignant/create_enseignant";
import UpdateEnseignant from "./components/crud_enseignant/update_enseignant/update_enseignant";
import ReadEnseignant from "./components/crud_enseignant/read_enseignant/read_enseignant";
import CreateEtudiant from "./components/crud_etudiant/create_etudiant/create_etudiant";
import UpdateEtudiant from "./components/crud_etudiant/update_etudiant/update_etudiant";
import ReadEtudiant from "./components/crud_etudiant/read_etudiant/read_etudiant";
import CreateEvenement from "./components/crud_evenement/create_evenement/create_evenement";
import UpdateEvenement from "./components/crud_evenement/update_evenement/update_evenement";
import ReadEvenement from "./components/crud_evenement/read_evenement/read_evenement";
import Administratif from "./components/administratif/index";
import Enseignant from "./components/enseignant/index";
import Responsable from "./components/responsable/index";
import CreatePfa from "./components/crud_pfa/create_pfa/create_pfa";
import UpdatePfa from "./components/crud_pfa/update_pfa/update_pfa";
import ReadPfa from "./components/crud_pfa/read_pfa/read_pfa";
import ForgotPassword from "./components/forgot_password/index";
import PasswordReset from "./components/PasswordReset/index";
import PrivateRoute from "./components/PrivateRoutes/privateroute.js";
import EspacEtudiant from "./components/espaceEtudiant/espaceEtudiant";
import EspaceEnseignant from "./components/espace_enseignant/index";
import EspaceAlumni from "./components/compte_alumni/welcome_alumni/index";
import EspaceDirecteur from "./components/espace_directeur/index";
import SignupAlumni from "./components/compte_alumni/signUpAlumni/index";
import CheckStatus from "./components/compte_alumni/check_status/index";
import ChangePassword from "./components/change_password";
import ValidAlumnis from "./components/compte_alumni/valider_compte_alumni";
import Charts from "./components/statistiques/vueStatistiques";

import CreateStageEté from "./components/stage/stage-été";
import CreateStagePfe from "./components/stage/stage-pfe";
import ReadPFE from "./components/pfe/listePfeforAdmin";
import PfeEnseignant from "./components/enseignant/listePfe";
import MesStageEte from "./components/stage/mesStagesEtes";
import UpdateStage from "./components/stage/updateStageEte";
import MesStagePFE from "./components/stage/mesStagePfe";
import MesPFE from "./components/enseignant/mesPfe";
import UpdateStagePFE from "./components/stage/updateStagePFE";
import Statistique from "./components/statistics/statistics";
import AnneeUniv from "./components/administratif/annéeuniversitaire";
import * as apiet from "./service/etudiant.js";
import AllNotification from "./components/espaceEtudiant/allnotification";


import { ToastContainer } from "react-toastify";
import AddAlumnis from "./components/compte_alumni/add_demande";
import PfaEtudiant from "./components/espaceEtudiant/monpfa";
import ReadPFA from "./components/pfa/listePfaAdmin";
import MesPFA from "./components/enseignant/mesPfa";
import ValiderPfa from "./components/pfa/validerPfa";
import UpdateCvAlumni from "./components/update_cv/update_cv_alumni";
import CvView from "./components/crud_pfa/read_pfa/cv_view";
import CvViewpfe from "./components/enseignant/cv_view";

import UpdateEtudiantCompte from "./components/update_etudiant/update_etudiant";
import ReadEvenementByStudent from "./components/crud_evenement/ReadEvenementByStudent/ReadEvenementByStudent";
import ListeEtudiants from "./components/enseignant/ListeEtudiants";
import CvEtudiant from "./components/enseignant/cvEtudiant";
import DetailEtudiant from "./components/crud_etudiant/Detail_etudiant/Detail_etudiant";
import CalendarYear from "./components/espaceEtudiant/Calendar";
import CompteEtudiantPublic from "./components/compte_etudiant_public/CompteEtudiantPublic";
import DetailEtudiantPublicCompte from "./components/compte_etudiant_public/DetailEtudiantPublicCompte";
import ListeVacation from "./components/valider_demande_vacation/index";
import ListeExpert from "./components/valider_demande_expert/index";
import ListPost from "./components/crud_posts/listPosts/index";
import AddPost from "./components/crud_posts/addPost/index";
import ModifPost from "./components/crud_posts/modifierPost/index";
import GererDoitAccess from "./components/administratif/gererdroitacces";
import CreateAdministratif from "./components/administratif/create_administratif";
import { Update } from "@mui/icons-material";
import UpdateAdministratif from "./components/administratif/updatedroitaccess";

import ListPfa from "./components/pfa/listePfaResponsable";


import espaceAlumniSideNav from "./components/espaceAlumni/espace_alumni"

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await apiet.sendmail();
        const result2 = await apiet.sendmailcmp();

        const result3 = await apiet.sendmailtravail();
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
  /*   const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }; */

  return (
    /*     <ThemeContext.Provider /* value={{ theme, toggleTheme }} >
     */ <div className="App" /* id={theme} */>
      {/*  <div className="switch">
        <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
      </div> */}
      <Router>
        <Routes>
                <Route path="*" element={<Navigate to="/signin" replace />} />
          {/* Dorra */}
          <Route path="/charts" element={<Charts />} /> {/*fonctionne*/}
          <Route path="/addDemandes" element={<AddAlumnis />} />
          {/*fonctionne*/}
          <Route path="/validDemand" element={<ListeVacation />} />{" "}
          {/*fonctionne*/}
          <Route path="/validExpert" element={<ListeExpert />} />
          {/*fonctionne*/}
          <Route path="/list-posts" element={<ListPost />} /> {/*fonctionne*/}
          <Route path="/ajouter-post" element={<AddPost />} /> {/*fonctionne*/}
          <Route path="/modifier-post/:id" element={<ModifPost />} />{" "}
          {/*fonctionne*/}
          <Route path="/signupA" element={<SignupAlumni />} /> {/*fonctionne*/}
          <Route path="/check" element={<CheckStatus />} />
          {/*fonctionne*/}
          <Route path="/validAlumnis" element={<ValidAlumnis />} />
          {/*fonctionne*/}
          {/* End Dorra */}

          <Route path="/" element={<Navigate replace to="/signin" />} />
          
          <Route path="/signin" element={<Signin />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/change-password" element={<ChangePassword />} />
          <Route
            path="/password-reset/:id/:token"
            element={<PasswordReset />}


          />
         
       
      
  
  
        
            <Route
              path="/update-enseignant/:id"
              element={<UpdateEnseignant />}
            />

            <Route
            path="/update-administratif/:id"
            element={<UpdateAdministratif />}
          />
          <Route
            path="/readall-evenement_by_etudiant"
            element={<ReadEvenementByStudent />}
          />
           

          <Route path="/espace-etudiant" element={<EspacEtudiant />} />

          <Route path="/espace-alumni" element={<EspaceAlumni />} />

          <Route path="/espace-directeur" element={<EspaceDirecteur />} />

          <Route path="/espace-enseignant" element={<EspaceEnseignant />} />

          <Route path="/create-enseignant" element={<CreateEnseignant />} />

          <Route path="/update-enseignant/:id" element={<UpdateEnseignant />} />

          <Route path="/enseignant-responsable" element={<Responsable />} />

          <Route path="/administratif" element={<Administratif />} />

          <Route path="/readall-enseignant" element={<ReadEnseignant />} />

          <Route path="/create-etudiant" element={<CreateEtudiant />} />

          <Route path="/update-etudiant/:id" element={<UpdateEtudiant />} />

          <Route path="/readall-etudiant" element={<ReadEtudiant />} />

          <Route path="/update-etudiant-compte" element={<UpdateEtudiantCompte />} />

          <Route path="/create-evenement" element={<CreateEvenement />} />

          <Route path="/update-evenement/:id" element={<UpdateEvenement />} />

          <Route path="/readall-evenement" element={<ReadEvenement />} />

          <Route path="/readall-pfa-admin" element={<ReadPFA />} />
          <Route path="/valider-pfa" element={<ValiderPfa />} />

          <Route path="/list-pfa" element={<ListPfa />} />

          <Route path="/create-pfa" element={<CreatePfa />} />

          <Route path="/update-pfa/:id" element={<UpdatePfa />} />

          <Route path="/readall-pfa" element={<ReadPfa />} />

          <Route path="/cv-view/:id" element={<CvView />} />
          <Route path="/cv-viewpfe/:id" element={<CvViewpfe />} />


          <Route path="/enseignant" element={<Enseignant />} />

      
  
        

            <Route path="/readall-pfe" element={<ReadPFE />} />

            <Route path="/mes-stage-ete" element={<MesStageEte />} />

            <Route path="/mes-stage-pfe" element={<MesStagePFE />} />

            <Route path="/liste-mes-pfe" element={<MesPFE />} />

            <Route path="/liste-mes-pfa" element={<MesPFA />} />

            <Route path="/liste-pfe" element={<PfeEnseignant />} />

          <Route path="/update-stagePFE/:id" element={<UpdateStagePFE />} />
          <Route path="/comptes-publics" element={<CompteEtudiantPublic />} />
       

          <Route path="/liste-des-etudiants" element={<ListeEtudiants />} />

          <Route path="/cv-etudiant/:id" element={<CvEtudiant />} />


            <Route path="/statistics-pfe" element={<Statistique />} />

            <Route path="anneeuniver" element={<AnneeUniv />} />
            <Route path="/detail_etudiant/:id" element={<DetailEtudiant />} />

          <Route
            path="/detail_etudiant_public_compte/:id"
            element={<DetailEtudiantPublicCompte />}
          />

          <Route path="/calendar" element={<CalendarYear />} />

          <Route path="/gerer_droit_acces" element={<GererDoitAccess />} />
          <Route
            path="/create-administratif"
            element={<CreateAdministratif />}
          />
            
       
          <Route path="/inserer-stage-ete" element={<CreateStageEté />} />

          <Route path="/inserer-stage-pfe" element={<CreateStagePfe />} />

          <Route path="/update-cv" element={<UpdateCV />} />

          <Route path="/update-cv-alumni" element={<UpdateCvAlumni />} />

          <Route path="/update-stageete/:id" element={<UpdateStage />} />

          <Route path="/choisir-pfa" element={<PfaEtudiant />} />  
  
      

  
          <Route path="/allnotification" element={<AllNotification />} />

          <Route path="/espace-alumni" element={<espaceAlumniSideNav />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;