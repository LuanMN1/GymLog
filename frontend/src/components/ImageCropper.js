import React, { useState, useRef, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './ImageCropper.css';

const ImageCropper = ({ imageSrc, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ unit: '%', width: 90, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [saving, setSaving] = useState(false);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  const onImageLoaded = useCallback((img) => {
    console.log('onImageLoaded called with:', img);
    if (img) {
      imgRef.current = img;
      console.log('Image dimensions:', img.width, img.height, img.naturalWidth, img.naturalHeight);
      const { width, height } = img;
      const size = Math.min(width, height);
      const x = (width - size) / 2;
      const y = (height - size) / 2;
      const initialCrop = {
        unit: 'px',
        width: size * 0.9,
        height: size * 0.9,
        x: x + (size * 0.05),
        y: y + (size * 0.05),
      };
      console.log('Setting initial crop:', initialCrop);
      setCrop(initialCrop);
      setCompletedCrop(initialCrop);
    }
    return false; // Prevent default crop reset
  }, []);

  const onCropChange = (crop) => {
    setCrop(crop);
    // Also update completedCrop when crop changes
    if (crop && crop.width && crop.height) {
      setCompletedCrop(crop);
    }
  };

  const onCropCompleteHandler = useCallback((crop) => {
    if (crop && crop.width && crop.height) {
      setCompletedCrop(crop);
    }
  }, []);

  const getCroppedImg = (image, crop) => {
    console.log('getCroppedImg called with:', { image, crop });
    
    if (!canvasRef.current) {
      console.error('Canvas ref not available');
      return Promise.resolve(null);
    }
    
    const canvas = canvasRef.current;
    if (!canvas || !crop || !image) {
      console.error('Missing required parameters:', { canvas: !!canvas, crop: !!crop, image: !!image });
      return Promise.resolve(null);
    }

    // Convert percentage crop to pixels if needed
    let cropPx = crop;
    if (crop.unit === '%') {
      cropPx = {
        x: (crop.x / 100) * image.width,
        y: (crop.y / 100) * image.height,
        width: (crop.width / 100) * image.width,
        height: (crop.height / 100) * image.height,
      };
    }

    // Ensure we have valid dimensions
    if (!cropPx.width || !cropPx.height || cropPx.width <= 0 || cropPx.height <= 0) {
      console.error('Invalid crop dimensions:', cropPx);
      return Promise.resolve(null);
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio || 1;
    const outputWidth = cropPx.width * scaleX;
    const outputHeight = cropPx.height * scaleY;
    
    canvas.width = outputWidth * pixelRatio;
    canvas.height = outputHeight * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    const cropX = cropPx.x * scaleX;
    const cropY = cropPx.y * scaleY;
    const cropWidth = cropPx.width * scaleX;
    const cropHeight = cropPx.height * scaleY;

    try {
      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        outputWidth,
        outputHeight
      );
    } catch (error) {
      console.error('Error drawing image to canvas:', error);
      return Promise.resolve(null);
    }

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to create blob from canvas');
          resolve(null);
          return;
        }
        const reader = new FileReader();
        reader.onerror = () => {
          console.error('FileReader error');
          resolve(null);
        };
        reader.onloadend = () => {
          console.log('Image cropped successfully');
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      }, 'image/jpeg', 0.9);
    });
  };

  const handleSave = async () => {
    if (saving) return; // Prevent multiple clicks
    
    setSaving(true);
    console.log('handleSave called');
    console.log('imgRef.current:', imgRef.current);
    console.log('completedCrop:', completedCrop);
    console.log('crop:', crop);
    
    try {
      // Try to get image from DOM if ref is not set
      let imageElement = imgRef.current;
      if (!imageElement) {
        const imgElement = document.querySelector('.cropper-content img');
        if (imgElement) {
          imageElement = imgElement;
          imgRef.current = imgElement;
        }
      }
      
      if (!imageElement) {
        console.error('Image reference not available');
        alert('Erro: Imagem não encontrada. Por favor, tente novamente.');
        setSaving(false);
        return;
      }
      
      // Use completedCrop if available, otherwise use current crop
      const cropToUse = completedCrop || crop;
      if (!cropToUse || !cropToUse.width || !cropToUse.height) {
        console.error('No valid crop available', cropToUse);
        alert('Erro: Área de corte não definida. Por favor, ajuste a área de corte.');
        setSaving(false);
        return;
      }
      
      console.log('Processing crop with:', cropToUse);
      
      const croppedImage = await getCroppedImg(imageElement, cropToUse);
      console.log('Cropped image result:', croppedImage ? 'Success' : 'Failed');
      if (croppedImage) {
        onCropComplete(croppedImage);
      } else {
        console.error('Failed to generate cropped image');
        alert('Erro ao processar a imagem. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Error cropping image:', error);
      alert('Erro ao processar a imagem: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="image-cropper-overlay">
      <div className="image-cropper-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cropper-header">
          <h3>Ajustar Foto</h3>
        </div>
        <div className="cropper-content">
          {imageSrc && (
            <ReactCrop
              crop={crop}
              onChange={onCropChange}
              onComplete={onCropCompleteHandler}
              onImageLoaded={onImageLoaded}
              aspect={1}
            >
              <img
                ref={imgRef}
                src={imageSrc}
                alt="Crop"
                style={{ maxWidth: '100%', maxHeight: '60vh', display: 'block' }}
                onLoad={(e) => {
                  // Backup: ensure ref is set on load
                  if (e.target && !imgRef.current) {
                    imgRef.current = e.target;
                    console.log('Image loaded, ref set via onLoad');
                  }
                }}
              />
            </ReactCrop>
          )}
          <canvas
            ref={canvasRef}
            style={{
              display: 'none',
            }}
          />
        </div>
        <div className="cropper-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-save" onClick={handleSave} disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;

