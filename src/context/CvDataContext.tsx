import React, { createContext, useContext, useState } from 'react';
import { CV_DATA, WorkExperience, SoftSkillItem } from '../data/cvData';
import { OfficialDocument } from '../data/documentsData';

export type CvData = typeof CV_DATA;

export type EditingTarget =
  | { type: 'personal'; data: CvData['personal'] }
  | { type: 'strategicProfile'; data: CvData['strategicProfile'] }
  | { type: 'aiSpecialty'; data: CvData['aiEnvironmentalSpecialty'] }
  | { type: 'workExperience'; isNew?: boolean; id?: string; data: Partial<WorkExperience> }
  | { type: 'officialDocument'; isNew?: boolean; id?: string; data: Partial<OfficialDocument> }
  | { type: 'softSkill'; isNew?: boolean; index?: number; data: Partial<SoftSkillItem> }
  | { type: 'achievement'; isNew?: boolean; index?: number; data: Partial<CvData['quantifiedAchievements'][0]> }
  | { type: 'technicalSkillCategory'; categoryIndex: number; data: CvData['technicalSkillsCategories'][0] };

export interface DeleteConfirmDialog {
  title: string;
  itemDescription: string;
  onConfirm: () => void;
}

interface CvDataContextValue {
  cvData: CvData;
  activeRole: 'owner' | 'visitor';
  setActiveRole: (role: 'owner' | 'visitor') => void;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  toggleEditMode: () => void;
  hasCustomChanges: boolean;

  // Password-protected edit mode
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  verifyAndUnlockEdit: (enteredPassword: string) => boolean;
  lockEditMode: () => void;
  updateEditPassword: (newPassword: string) => void;

  // Editing Modals state
  editingTarget: EditingTarget | null;
  openEditor: (target: EditingTarget) => void;
  closeEditor: () => void;

  // Deletion confirm modal
  deleteDialog: DeleteConfirmDialog | null;
  requestDelete: (title: string, itemDescription: string, onConfirm: () => void) => void;
  closeDeleteDialog: () => void;

  // Personal operations
  updatePersonal: (data: Partial<CvData['personal']>) => void;
  updatePersonalField: (field: keyof CvData['personal'], value: any) => void;
  updateCoreCompetency: (index: number, value: string) => void;
  addCoreCompetency: (value: string) => void;
  deleteCoreCompetency: (index: number) => void;
  updateLanguage: (index: number, field: 'name' | 'level', value: string) => void;
  addLanguage: (lang: { name: string; level: string }) => void;
  deleteLanguage: (index: number) => void;

  // Strategic Profile operations
  updateStrategicProfile: (data: Partial<CvData['strategicProfile']>) => void;
  updateStrategicProfileField: (field: keyof CvData['strategicProfile'], value: any) => void;

  // AI Specialty operations
  updateAISpecialty: (data: Partial<CvData['aiEnvironmentalSpecialty']>) => void;
  updateAISpecialtyField: (field: keyof CvData['aiEnvironmentalSpecialty'], value: any) => void;
  updateAISpecialtyPillar: (pillarIndex: number, field: string, value: any) => void;
  addAISpecialtyPillar: (pillar: CvData['aiEnvironmentalSpecialty']['pillars'][0]) => void;
  deleteAISpecialtyPillar: (pillarIndex: number) => void;

  // Work Experience operations
  saveWorkExperience: (item: WorkExperience, isNew?: boolean) => void;
  updateWorkExperienceField: (id: string, field: keyof WorkExperience, value: any) => void;
  addWorkExperienceResponsibility: (id: string, text: string) => void;
  updateWorkExperienceResponsibility: (id: string, index: number, text: string) => void;
  deleteWorkExperienceResponsibility: (id: string, index: number) => void;
  deleteWorkExperience: (id: string) => void;

  // Official Documents operations
  saveOfficialDocument: (doc: OfficialDocument, isNew?: boolean) => void;
  updateOfficialDocumentField: (id: string, field: keyof OfficialDocument, value: any) => void;
  deleteOfficialDocument: (id: string) => void;

  // Soft Skills operations
  saveSoftSkill: (skill: SoftSkillItem, isNew?: boolean, index?: number) => void;
  updateSoftSkillField: (index: number, field: keyof SoftSkillItem, value: string) => void;
  deleteSoftSkill: (index: number) => void;

  // Quantified Achievements operations
  saveAchievement: (achievement: CvData['quantifiedAchievements'][0], isNew?: boolean, index?: number) => void;
  updateAchievementField: (index: number, field: keyof CvData['quantifiedAchievements'][0], value: string) => void;
  deleteAchievement: (index: number) => void;

  // Technical Skills operations
  saveTechnicalSkill: (categoryName: string, skill: { name: string; level: string; isAtsKeyword: boolean }) => void;
  updateTechnicalSkill: (categoryName: string, skillIndex: number, updated: { name: string; level: string; isAtsKeyword: boolean }) => void;
  deleteTechnicalSkill: (categoryName: string, skillName: string) => void;
  updateTechnicalCategoryField: (catIndex: number, field: 'name' | 'description', value: string) => void;
  addTechnicalCategory: (cat: { name: string; description: string; skills: { name: string; level: string; isAtsKeyword: boolean }[] }) => void;
  deleteTechnicalCategory: (catIndex: number) => void;

  // Global operations
  resetToDefaults: () => void;
  exportDataJson: () => void;
  importDataJson: (jsonStr: string) => boolean;
}

const STORAGE_KEY = 'rocio_cv_custom_data_v3';
const EDIT_MODE_KEY = 'rocio_cv_edit_mode_active';
const ROLE_STORAGE_KEY = 'rocio_cv_active_role';
const PASSWORD_STORAGE_KEY = 'rocio_cv_edit_password';
const DEFAULT_CIP_PASSWORD = '322074';

const CvDataContext = createContext<CvDataContextValue | null>(null);

export const CvDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRoleState] = useState<'owner' | 'visitor'>(() => {
    try {
      const savedRole = localStorage.getItem(ROLE_STORAGE_KEY);
      return (savedRole === 'visitor' || savedRole === 'owner') ? savedRole : 'owner';
    } catch {
      return 'owner';
    }
  });

  const [cvData, setCvData] = useState<CvData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('rocio_cv_custom_data_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...CV_DATA,
          ...parsed,
          personal: { 
            ...CV_DATA.personal, 
            ...(parsed.personal || {}),
            coreCompetencies: parsed.personal?.coreCompetencies || CV_DATA.personal.coreCompetencies,
            languages: parsed.personal?.languages || CV_DATA.personal.languages,
            avatarUrl: (parsed.personal?.avatarUrl && !parsed.personal.avatarUrl.startsWith('/src/')) 
              ? parsed.personal.avatarUrl 
              : CV_DATA.personal.avatarUrl,
          },
          strategicProfile: { ...CV_DATA.strategicProfile, ...(parsed.strategicProfile || {}) },
          aiEnvironmentalSpecialty: { ...CV_DATA.aiEnvironmentalSpecialty, ...(parsed.aiEnvironmentalSpecialty || {}) },
          workExperience: parsed.workExperience || CV_DATA.workExperience,
          officialDocuments: parsed.officialDocuments || CV_DATA.officialDocuments,
          certifications: parsed.certifications || CV_DATA.certifications,
          softSkills: parsed.softSkills || CV_DATA.softSkills,
          quantifiedAchievements: parsed.quantifiedAchievements || CV_DATA.quantifiedAchievements,
          technicalSkillsCategories: parsed.technicalSkillsCategories || CV_DATA.technicalSkillsCategories,
          atsKeywordsList: parsed.atsKeywordsList || CV_DATA.atsKeywordsList,
        };
      }
    } catch (e) {
      console.error('Failed to load custom CV data from storage:', e);
    }
    return CV_DATA;
  });

  const [isEditMode, setIsEditModeState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(EDIT_MODE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const verifyAndUnlockEdit = (entered: string): boolean => {
    const clean = entered.trim();
    const currentPass = localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_CIP_PASSWORD;
    const isValid = 
      clean === currentPass ||
      clean === DEFAULT_CIP_PASSWORD ||
      clean.toLowerCase() === 'cip 322074' ||
      clean.toLowerCase() === 'cip n° 322074' ||
      clean.toLowerCase() === 'cip n°322074' ||
      clean === 'rocio2026';

    if (isValid) {
      setIsEditModeState(true);
      try {
        localStorage.setItem(EDIT_MODE_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const lockEditMode = () => {
    setIsEditModeState(false);
    try {
      localStorage.setItem(EDIT_MODE_KEY, 'false');
    } catch (e) {
      console.error(e);
    }
  };

  const updateEditPassword = (newPassword: string) => {
    try {
      localStorage.setItem(PASSWORD_STORAGE_KEY, newPassword.trim());
    } catch (e) {
      console.error(e);
    }
  };

  const setActiveRole = (role: 'owner' | 'visitor') => {
    setActiveRoleState(role);
    try {
      localStorage.setItem(ROLE_STORAGE_KEY, role);
    } catch (e) {
      console.error(e);
    }
  };

  const effectiveIsEditMode = isEditMode;

  const [hasCustomChanges, setHasCustomChanges] = useState<boolean>(() => {
    return !!(localStorage.getItem(STORAGE_KEY) || localStorage.getItem('rocio_cv_custom_data_v2'));
  });

  const [editingTarget, setEditingTarget] = useState<EditingTarget | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<DeleteConfirmDialog | null>(null);

  // Sync to localStorage
  const saveCvDataState = (newData: CvData) => {
    setCvData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      setHasCustomChanges(true);
    } catch (e) {
      console.error('Failed to save CV data to localStorage:', e);
    }
  };

  const setIsEditMode = (val: boolean) => {
    if (val) {
      setIsAuthModalOpen(true);
    } else {
      lockEditMode();
    }
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      lockEditMode();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const openEditor = (target: EditingTarget) => {
    setEditingTarget(target);
  };

  const closeEditor = () => {
    setEditingTarget(null);
  };

  const requestDelete = (title: string, itemDescription: string, onConfirm: () => void) => {
    setDeleteDialog({
      title,
      itemDescription,
      onConfirm: () => {
        onConfirm();
        setDeleteDialog(null);
      }
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(null);
  };

  // Personal
  const updatePersonal = (data: Partial<CvData['personal']>) => {
    saveCvDataState({
      ...cvData,
      personal: { ...cvData.personal, ...data },
    });
  };

  const updatePersonalField = (field: keyof CvData['personal'], value: any) => {
    saveCvDataState({
      ...cvData,
      personal: { ...cvData.personal, [field]: value },
    });
  };

  const updateCoreCompetency = (index: number, value: string) => {
    const list = [...(cvData.personal.coreCompetencies || [])];
    list[index] = value;
    updatePersonalField('coreCompetencies', list);
  };

  const addCoreCompetency = (value: string) => {
    const list = [...(cvData.personal.coreCompetencies || []), value];
    updatePersonalField('coreCompetencies', list);
  };

  const deleteCoreCompetency = (index: number) => {
    const list = (cvData.personal.coreCompetencies || []).filter((_, idx) => idx !== index);
    updatePersonalField('coreCompetencies', list);
  };

  const updateLanguage = (index: number, field: 'name' | 'level', value: string) => {
    const list = [...cvData.personal.languages];
    list[index] = { ...list[index], [field]: value };
    updatePersonalField('languages', list);
  };

  const addLanguage = (lang: { name: string; level: string }) => {
    const list = [...cvData.personal.languages, lang];
    updatePersonalField('languages', list);
  };

  const deleteLanguage = (index: number) => {
    const list = cvData.personal.languages.filter((_, idx) => idx !== index);
    updatePersonalField('languages', list);
  };

  // Strategic Profile
  const updateStrategicProfile = (data: Partial<CvData['strategicProfile']>) => {
    saveCvDataState({
      ...cvData,
      strategicProfile: { ...cvData.strategicProfile, ...data },
    });
  };

  const updateStrategicProfileField = (field: keyof CvData['strategicProfile'], value: any) => {
    saveCvDataState({
      ...cvData,
      strategicProfile: { ...cvData.strategicProfile, [field]: value },
    });
  };

  // AI Specialty
  const updateAISpecialty = (data: Partial<CvData['aiEnvironmentalSpecialty']>) => {
    saveCvDataState({
      ...cvData,
      aiEnvironmentalSpecialty: { ...cvData.aiEnvironmentalSpecialty, ...data },
    });
  };

  const updateAISpecialtyField = (field: keyof CvData['aiEnvironmentalSpecialty'], value: any) => {
    saveCvDataState({
      ...cvData,
      aiEnvironmentalSpecialty: { ...cvData.aiEnvironmentalSpecialty, [field]: value },
    });
  };

  const updateAISpecialtyPillar = (pillarIndex: number, field: string, value: any) => {
    const pillars = [...cvData.aiEnvironmentalSpecialty.pillars];
    pillars[pillarIndex] = { ...pillars[pillarIndex], [field]: value };
    updateAISpecialtyField('pillars', pillars);
  };

  const addAISpecialtyPillar = (pillar: CvData['aiEnvironmentalSpecialty']['pillars'][0]) => {
    const pillars = [...cvData.aiEnvironmentalSpecialty.pillars, pillar];
    updateAISpecialtyField('pillars', pillars);
  };

  const deleteAISpecialtyPillar = (pillarIndex: number) => {
    const pillars = cvData.aiEnvironmentalSpecialty.pillars.filter((_, idx) => idx !== pillarIndex);
    updateAISpecialtyField('pillars', pillars);
  };

  // Work Experience
  const saveWorkExperience = (item: WorkExperience, isNew?: boolean) => {
    let updatedList = [...cvData.workExperience];
    if (isNew) {
      updatedList = [item, ...updatedList];
    } else {
      updatedList = updatedList.map((exp) => (exp.id === item.id ? item : exp));
    }
    saveCvDataState({
      ...cvData,
      workExperience: updatedList,
    });
  };

  const updateWorkExperienceField = (id: string, field: keyof WorkExperience, value: any) => {
    const updatedList = cvData.workExperience.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    saveCvDataState({
      ...cvData,
      workExperience: updatedList,
    });
  };

  const addWorkExperienceResponsibility = (id: string, text: string) => {
    const exp = cvData.workExperience.find((w) => w.id === id);
    if (!exp) return;
    const list = [...exp.responsibilitiesAndAchievements, text];
    updateWorkExperienceField(id, 'responsibilitiesAndAchievements', list);
  };

  const updateWorkExperienceResponsibility = (id: string, index: number, text: string) => {
    const exp = cvData.workExperience.find((w) => w.id === id);
    if (!exp) return;
    const list = [...exp.responsibilitiesAndAchievements];
    list[index] = text;
    updateWorkExperienceField(id, 'responsibilitiesAndAchievements', list);
  };

  const deleteWorkExperienceResponsibility = (id: string, index: number) => {
    const exp = cvData.workExperience.find((w) => w.id === id);
    if (!exp) return;
    const list = exp.responsibilitiesAndAchievements.filter((_, idx) => idx !== index);
    updateWorkExperienceField(id, 'responsibilitiesAndAchievements', list);
  };

  const deleteWorkExperience = (id: string) => {
    saveCvDataState({
      ...cvData,
      workExperience: cvData.workExperience.filter((exp) => exp.id !== id),
    });
  };

  // Official Documents
  const saveOfficialDocument = (doc: OfficialDocument, isNew?: boolean) => {
    let updatedList = [...cvData.officialDocuments];
    if (isNew) {
      updatedList = [doc, ...updatedList];
    } else {
      updatedList = updatedList.map((d) => (d.id === doc.id ? doc : d));
    }
    saveCvDataState({
      ...cvData,
      officialDocuments: updatedList,
    });
  };

  const updateOfficialDocumentField = (id: string, field: keyof OfficialDocument, value: any) => {
    const updatedList = cvData.officialDocuments.map((d) =>
      d.id === id ? { ...d, [field]: value } : d
    );
    saveCvDataState({
      ...cvData,
      officialDocuments: updatedList,
    });
  };

  const deleteOfficialDocument = (id: string) => {
    saveCvDataState({
      ...cvData,
      officialDocuments: cvData.officialDocuments.filter((d) => d.id !== id),
    });
  };

  // Soft Skills
  const saveSoftSkill = (skill: SoftSkillItem, isNew?: boolean, index?: number) => {
    let updatedList = [...cvData.softSkills];
    if (isNew || index === undefined || index < 0) {
      updatedList.push(skill);
    } else {
      updatedList[index] = skill;
    }
    saveCvDataState({
      ...cvData,
      softSkills: updatedList,
    });
  };

  const updateSoftSkillField = (index: number, field: keyof SoftSkillItem, value: string) => {
    const updatedList = [...cvData.softSkills];
    if (updatedList[index]) {
      updatedList[index] = { ...updatedList[index], [field]: value };
      saveCvDataState({
        ...cvData,
        softSkills: updatedList,
      });
    }
  };

  const deleteSoftSkill = (index: number) => {
    saveCvDataState({
      ...cvData,
      softSkills: cvData.softSkills.filter((_, idx) => idx !== index),
    });
  };

  // Achievements
  const saveAchievement = (
    achievement: CvData['quantifiedAchievements'][0],
    isNew?: boolean,
    index?: number
  ) => {
    let updatedList = [...cvData.quantifiedAchievements];
    if (isNew || index === undefined || index < 0) {
      updatedList.push(achievement);
    } else {
      updatedList[index] = achievement;
    }
    saveCvDataState({
      ...cvData,
      quantifiedAchievements: updatedList,
    });
  };

  const updateAchievementField = (
    index: number, 
    field: keyof CvData['quantifiedAchievements'][0], 
    value: string
  ) => {
    const updatedList = [...cvData.quantifiedAchievements];
    if (updatedList[index]) {
      updatedList[index] = { ...updatedList[index], [field]: value };
      saveCvDataState({
        ...cvData,
        quantifiedAchievements: updatedList,
      });
    }
  };

  const deleteAchievement = (index: number) => {
    saveCvDataState({
      ...cvData,
      quantifiedAchievements: cvData.quantifiedAchievements.filter((_, idx) => idx !== index),
    });
  };

  // Technical Skills
  const saveTechnicalSkill = (
    categoryName: string,
    skill: { name: string; level: string; isAtsKeyword: boolean }
  ) => {
    const updatedCats = cvData.technicalSkillsCategories.map((cat) => {
      if (cat.name === categoryName) {
        const existingIdx = cat.skills.findIndex((s) => s.name === skill.name);
        let updatedSkills = [...cat.skills];
        if (existingIdx >= 0) {
          updatedSkills[existingIdx] = skill;
        } else {
          updatedSkills.push(skill);
        }
        return { ...cat, skills: updatedSkills };
      }
      return cat;
    });

    saveCvDataState({
      ...cvData,
      technicalSkillsCategories: updatedCats,
    });
  };

  const updateTechnicalSkill = (
    categoryName: string, 
    skillIndex: number, 
    updated: { name: string; level: string; isAtsKeyword: boolean }
  ) => {
    const updatedCats = cvData.technicalSkillsCategories.map((cat) => {
      if (cat.name === categoryName) {
        const updatedSkills = [...cat.skills];
        updatedSkills[skillIndex] = updated;
        return { ...cat, skills: updatedSkills };
      }
      return cat;
    });

    saveCvDataState({
      ...cvData,
      technicalSkillsCategories: updatedCats,
    });
  };

  const deleteTechnicalSkill = (categoryName: string, skillName: string) => {
    const updatedCats = cvData.technicalSkillsCategories.map((cat) => {
      if (cat.name === categoryName) {
        return {
          ...cat,
          skills: cat.skills.filter((s) => s.name !== skillName),
        };
      }
      return cat;
    });

    saveCvDataState({
      ...cvData,
      technicalSkillsCategories: updatedCats,
    });
  };

  const updateTechnicalCategoryField = (catIndex: number, field: 'name' | 'description', value: string) => {
    const cats = [...cvData.technicalSkillsCategories];
    if (cats[catIndex]) {
      cats[catIndex] = { ...cats[catIndex], [field]: value };
      saveCvDataState({
        ...cvData,
        technicalSkillsCategories: cats,
      });
    }
  };

  const addTechnicalCategory = (cat: { name: string; description: string; skills: { name: string; level: string; isAtsKeyword: boolean }[] }) => {
    saveCvDataState({
      ...cvData,
      technicalSkillsCategories: [...cvData.technicalSkillsCategories, cat],
    });
  };

  const deleteTechnicalCategory = (catIndex: number) => {
    saveCvDataState({
      ...cvData,
      technicalSkillsCategories: cvData.technicalSkillsCategories.filter((_, idx) => idx !== catIndex),
    });
  };

  // Reset to original factory defaults
  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('rocio_cv_custom_data_v2');
      setCvData(CV_DATA);
      setHasCustomChanges(false);
    } catch (e) {
      console.error(e);
    }
  };

  // Export JSON file
  const exportDataJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `cv_rocio_paredes_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON file
  const importDataJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && parsed.personal && parsed.workExperience) {
        saveCvDataState({
          ...CV_DATA,
          ...parsed,
        });
        return true;
      }
      return false;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  };

  return (
    <CvDataContext.Provider
      value={{
        cvData,
        activeRole,
        setActiveRole,
        isEditMode: effectiveIsEditMode,
        setIsEditMode,
        toggleEditMode,
        hasCustomChanges,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        verifyAndUnlockEdit,
        lockEditMode,
        updateEditPassword,
        editingTarget,
        openEditor,
        closeEditor,
        deleteDialog,
        requestDelete,
        closeDeleteDialog,
        updatePersonal,
        updatePersonalField,
        updateCoreCompetency,
        addCoreCompetency,
        deleteCoreCompetency,
        updateLanguage,
        addLanguage,
        deleteLanguage,
        updateStrategicProfile,
        updateStrategicProfileField,
        updateAISpecialty,
        updateAISpecialtyField,
        updateAISpecialtyPillar,
        addAISpecialtyPillar,
        deleteAISpecialtyPillar,
        saveWorkExperience,
        updateWorkExperienceField,
        addWorkExperienceResponsibility,
        updateWorkExperienceResponsibility,
        deleteWorkExperienceResponsibility,
        deleteWorkExperience,
        saveOfficialDocument,
        updateOfficialDocumentField,
        deleteOfficialDocument,
        saveSoftSkill,
        updateSoftSkillField,
        deleteSoftSkill,
        saveAchievement,
        updateAchievementField,
        deleteAchievement,
        saveTechnicalSkill,
        updateTechnicalSkill,
        deleteTechnicalSkill,
        updateTechnicalCategoryField,
        addTechnicalCategory,
        deleteTechnicalCategory,
        resetToDefaults,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </CvDataContext.Provider>
  );
};

export const useCvData = (): CvDataContextValue => {
  const ctx = useContext(CvDataContext);
  if (!ctx) {
    throw new Error('useCvData must be used within a CvDataProvider');
  }
  return ctx;
};
